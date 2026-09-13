import type {
  PracticeManagementProvider,
  PmMatter,
  PmContact,
  ApprovedTimeEntry,
} from './types.js';

export interface ClioConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  baseUrl?: string; // defaults to https://app.clio.com/api/v4
}

/**
 * Clio Manage API v4 Adapter
 * OAuth 2.0 Authorization Code flow with refresh token management.
 */
export class ClioProvider implements PracticeManagementProvider {
  readonly id = 'clio' as const;

  private readonly config: ClioConfig;
  private readonly baseUrl: string;

  constructor(config: ClioConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://app.clio.com/api/v4';
  }

  async connect(firmId: string): Promise<{ authorizeUrl: string }> {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      state: firmId,
    });
    return {
      authorizeUrl: `https://app.clio.com/oauth/authorize?${params.toString()}`,
    };
  }

  async handleCallback(firmId: string, code: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch('https://app.clio.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code,
          redirect_uri: this.config.redirectUri,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        return { success: false, error: `Clio OAuth failed: ${errText}` };
      }

      // Tokens should be encrypted and stored in firm document (Phase 5)
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }

  async listMatters(_firmId: string, _query?: string): Promise<PmMatter[]> {
    // Stubbed for Phase 1; live Clio integration in Phase 5
    return [];
  }

  async listContacts(_firmId: string, _query?: string): Promise<PmContact[]> {
    return [];
  }

  async createTimeEntry(_firmId: string, _entry: ApprovedTimeEntry): Promise<{ externalId: string }> {
    // Phase 5: POST /api/v4/activities with type=TimeEntry
    return { externalId: `clio-te-stub-${Date.now()}` };
  }

  async updateTimeEntry(_firmId: string, _externalId: string, _entry: ApprovedTimeEntry): Promise<void> {
    // Phase 5: PATCH /api/v4/activities/{id}
  }
}
