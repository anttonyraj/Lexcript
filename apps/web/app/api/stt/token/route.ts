import { NextResponse } from 'next/server';
import { resolveProvider, DeepgramAdapter, SonioxAdapter } from '@lexcript/stt';
import type { SttOptions } from '@lexcript/stt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firmId, matterKeyterms = [], requestedTtl = 3600, cumulativeSpend = 0, firmOverride } = body;

    if (!firmId) {
      return NextResponse.json({ error: 'firmId is required' }, { status: 400 });
    }

    const decision = resolveProvider({
      firmId,
      mode: 'streaming',
      cumulativeDeepgramSpendUsd: cumulativeSpend,
      providerOverride: firmOverride,
    });

    const options: SttOptions = {
      language: 'en',
      diarize: true,
      punctuate: true,
      wordTimestamps: true,
      keyterms: matterKeyterms,
    };

    let result;
    if (decision.providerId === 'deepgram') {
      const adapter = new DeepgramAdapter({
        apiKey: process.env.DEEPGRAM_API_KEY || 'mock-dg-key',
        projectId: process.env.DEEPGRAM_PROJECT_ID,
      });
      result = await adapter.mintStreamingToken({
        firmId,
        ttlSeconds: requestedTtl,
        options,
      });
    } else {
      const adapter = new SonioxAdapter({
        apiKey: process.env.SONIOX_API_KEY || 'mock-soniox-key',
      });
      result = await adapter.mintStreamingToken({
        firmId,
        ttlSeconds: requestedTtl,
        options,
      });
    }

    return NextResponse.json({
      providerId: decision.providerId,
      token: result.token,
      wsUrl: result.wsUrl,
      expiresAt: result.expiresAt,
      cutoverActive: decision.isCutoverActive,
      alert: decision.alert,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
