import { NextResponse } from 'next/server';
import { DeepgramAdapter, SonioxAdapter } from '@lexcript/stt';
import { normalizeRawTranscript } from '@lexcript/transcript';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params;
    const bodyRaw = await req.text();

    const headersObj: Record<string, string> = {};
    req.headers.forEach((val, key) => {
      headersObj[key.toLowerCase()] = val;
    });

    let bodyJson: unknown;
    try {
      bodyJson = JSON.parse(bodyRaw);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    if (provider === 'deepgram') {
      const adapter = new DeepgramAdapter({
        apiKey: process.env.DEEPGRAM_API_KEY || 'mock-key',
        webhookSecret: process.env.DEEPGRAM_WEBHOOK_SECRET,
      });

      const signature = headersObj['dg-signature'] || headersObj['x-deepgram-signature'];
      if (!adapter.verifyWebhookSignature(bodyRaw, signature)) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }

      const parsed = adapter.parseWebhook(bodyJson, headersObj);
      if ('error' in parsed) {
        return NextResponse.json({ error: parsed.error }, { status: 422 });
      }

      const canonical = normalizeRawTranscript({
        recordingId: parsed.recordingId,
        firmId: parsed.usage.firmId,
        matterId: 'mat-pending',
        raw: parsed.transcript,
      });

      return NextResponse.json({
        success: true,
        recordingId: parsed.recordingId,
        segmentCount: canonical.segments.length,
        usage: parsed.usage,
      });
    }

    if (provider === 'soniox') {
      const adapter = new SonioxAdapter({
        apiKey: process.env.SONIOX_API_KEY || 'mock-key',
      });

      const parsed = adapter.parseWebhook(bodyJson, headersObj);
      if ('error' in parsed) {
        return NextResponse.json({ error: parsed.error }, { status: 422 });
      }

      const canonical = normalizeRawTranscript({
        recordingId: parsed.recordingId,
        firmId: parsed.usage.firmId,
        matterId: 'mat-pending',
        raw: parsed.transcript,
      });

      return NextResponse.json({
        success: true,
        recordingId: parsed.recordingId,
        segmentCount: canonical.segments.length,
        usage: parsed.usage,
      });
    }

    return NextResponse.json({ error: `Unknown provider: ${provider}` }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
