import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || 'BookByShow';
    const type = searchParams.get('type') || 'movie';
    const price = searchParams.get('price');
    const badge = searchParams.get('badge') || (type === 'cinema' ? 'Cinemas' : type === 'event' ? 'Live Event' : 'Now Showing');
    const subtitle =
      searchParams.get('subtitle') ||
      'Compare showtimes, seat availability & ticket rates with 100% price transparency.';

    const typeColor =
      type === 'event'
        ? '#f59e0b'
        : type === 'cinema'
        ? '#38bdf8'
        : type === 'deals'
        ? '#10b981'
        : '#e51821';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#06080e',
            backgroundImage:
              'radial-gradient(circle at 15% 15%, rgba(229, 24, 33, 0.18), transparent 45%), radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.12), transparent 40%)',
            padding: '60px',
            fontFamily: 'sans-serif',
            color: '#ffffff',
          }}
        >
          {/* Top Bar: Brand & Category */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Brand Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#e51821',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(229, 24, 33, 0.4)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7Z"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <path d="M10 5V19" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 2" />
                  <polygon points="14,10 17,12 14,14" fill="#ffffff" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '26px',
                    fontWeight: 900,
                    letterSpacing: '-0.5px',
                    color: '#ffffff',
                  }}
                >
                  BookByShow
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                  Entertainment Price Aggregator
                </span>
              </div>
            </div>

            {/* Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: `1.5px solid ${typeColor}`,
                color: typeColor,
                fontSize: '15px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </div>
          </div>

          {/* Center Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}>
            <h1
              style={{
                fontSize: title.length > 30 ? '48px' : '58px',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-1px',
                color: '#f8fafc',
                maxWidth: '960px',
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '20px',
                color: '#94a3b8',
                lineHeight: 1.4,
                maxWidth: '860px',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom Bar: Price & Vendor Comparison Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Vendor comparison chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                Comparing:
              </span>
              {['AMC', 'Regal', 'Cinemark', 'Ticketmaster', 'StubHub'].map((vendor) => (
                <div
                  key={vendor}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#e2e8f0',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  {vendor}
                </div>
              ))}
            </div>

            {/* Price or Transparency Seal */}
            {price ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  backgroundColor: 'rgba(229, 24, 33, 0.15)',
                  border: '1px solid rgba(229, 24, 33, 0.4)',
                  padding: '10px 20px',
                  borderRadius: '12px',
                }}
              >
                <span style={{ fontSize: '14px', color: '#fca5a5', fontWeight: 600 }}>From</span>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff' }}>{price}</span>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  color: '#34d399',
                  fontSize: '14px',
                  fontWeight: 800,
                }}
              >
                ✓ 100% Zero Surprise Fees
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Failed to generate OpenGraph image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
