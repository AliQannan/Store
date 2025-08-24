import Head from 'next/head';

export default function ProductPage() {
  return (
    <div>
      <Head>
        <title>منتج - لصقات الفقرات القطنية العشبية</title>
        <meta name="description" content="عرض لمنتج لصقات الفقرات القطنية العشبية" />
      </Head>

      <main style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        direction: 'rtl'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          لصقات الفقرات القطنية العشبية - الأكثر مبيعًا
        </h1>
        
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '800px',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <iframe 
            src="https://www.alibaba.com/product-detail/TOP-Selling-Herbal-Lumbar-Vertebra-Patches_1601421740121.html?spm=a27aq.27095423.1978240560.1.78372277J3S4m8"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>يمكنك استعراض المنتج مباشرة من خلال الإطار أعلاه</p>
        </div>
      </main>
    </div>
  );
}
