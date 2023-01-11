<h3>Hava Durumu Uygulaması</h3>

<img src='https://github.com/Musti2735/weatherApp/blob/main/src/assets/ekran2.png'  width='700px'>

<h4><a href='https://quick-muscle.surge.sh/'>Canlı Link için tıklayın</a></h4>

<p>React kullanılarak hazırlanan bu uygulamada, openweather üzerinden 5 günlük hava durumunu gösterir API çağırılmıştır. Gelen API kaynağından veriler fetch kullanılarak alınmış ve kullanıcıya gösterilmiştir.</p>

<p>Uygulama tarayıcı ilk açıldığında tarayıcının konum verisini almaktadır. Eğer konum varsa, useEffect hooku ile taraycıdan alınan konum bilgisi fetch API ile çağrılmakta ve varsayılan olarak gösterilmektedir. Tarayıcı konumu yok ise kullanıcıdan input alanına şehir bilgisi girmesi beklenmektedir.
</p>

<p>Şehrin gün içinde, en yüksek, en düşük sıcaklık, gündoğumu, günbatımı ve rüzgar hızı ile birlikte üçer saatlik arayla saatlik gösterim mevcuttur. 'Haftalık Görünüm' butonu tıklandığında, devam eden 4 günün hava durumu bilgisi ekrana getirilmektedir. Openweather ücretsiz sürümünde sınırlı olarak kaynak desteği sunduğu için daha fazla detay bilgi uygulamaya eklenememiştir. Ayrıca mobil tarayıcıların, ne yazık ki hava durumu ikonlarını desteklemediği görülmüştür.</p>

<p>Context yapısı kullanılarak componentler arasında veri transferi sağlanmıştır.</p>

<p>Uygulamada kullanıcı yıldız butonuna tıklayarak şehri favorilere ekleyebilir veya eklemiş olduğu şehri favori listensinden kaldırabilir. Favori listesinde bulunan şehrin üzerine tıklandığında, o şehrin hava durumu bilgisi ekrana getirilecektir. Ayrıca favori listesi localstorage'de kaydedildiği için tarayıcı yeniden yüklendiğinde ekrana gelecektir. </p>

<p>Tasarım responsive hazırlanmış olup, mobil cizhazlar için kullanımı uygundur. Ekran boyutu azaldığında kademeli olarak box'ların dizilişi, genişliği, yazı boyutu oransal olarak değişmektedir. Bunun için css @media özelliği ile birlikte boyutlandırma için rem değeri kullanılmıştır.
</p>

<p>Tüm tasarım tamamen sıfırdan hazırlanmış ve sadece css kullanılmıştır.</p>





