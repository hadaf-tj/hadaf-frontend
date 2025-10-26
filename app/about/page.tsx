const AboutPage = () => {
    return (
      <div className="bg-white">
        {/* Секция 1: Главный экран */}
        <section className="text-center py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#763f97] mb-4">
            Мы — Пайванд.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создали эту платформу, чтобы соединить желание помочь с теми, кто в этой помощи остро нуждается. Наша миссия — сделать благотворительность в Таджикистане простой, прозрачной и доступной для каждого.
          </p>
        </section>
  
        {/* Секция 2: Что мы делаем */}
        <section className="py-20 px-4 bg-gray-50 border-y">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-bold text-center text-[#763f97] mb-12">Что мы делаем</h2>
             <div className="grid md:grid-cols-2 gap-10 text-left">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Прозрачный сбор нужд</h3>
                    <p className="text-gray-600">
                        Учреждения напрямую публикуют списки своих актуальных потребностей. Вы видите, что именно нужно, и можете быть уверены, что ваша помощь будет использована по назначению.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Помощь без посредников</h3>
                    <p className="text-gray-600">
                        Платформа не взимает комиссий. Вы связываетесь с учреждением напрямую, чтобы передать вещи, продукты или оказать другую помощь. 100% вашей поддержки доходит до адресата.
                    </p>
                </div>
             </div>
           </div>
        </section>
      </div>
    );
  };
  export default AboutPage;