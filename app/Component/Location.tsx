export default function Location() {
  const clients = [
    {
      name: "Mars IT school",
      image: "https://i.ibb.co/jPjg8HDx/5922378.jpg",
      imageClass: "object-cover"
    },
    {
      name: "Hotel Inspera-S Tashkent",
      image: "https://i.ibb.co/RGgMB1St/381738538.jpg",
      imageClass: "object-cover"
    },
    {
      name: "Cambridge Learning Center",
      image: "https://i.ibb.co/0kRNWsd/download.png",
      imageClass: "object-contain"
    },
    {
      name: "Colba ta'lim markazi",
      image: "https://i.ibb.co/7xHGHcNJ/logo.png",
      imageClass: "object-contain p-2"
    },
    {
      name: "DataLab company",
      image: "https://i.ibb.co/xt5ZBQ3Q/download.png",
      imageClass: "object-contain"
    },
    {
      name: "Gigu Fashion School",
      image: "https://i.ibb.co/vyp8yk5/download.jpg",
      imageClass: "object-cover"
    }
  ];

  return (
    <section className="py-20 px-4">
      <h3 className="text-5xl text-center font-bold font-mono">
        Bizga ishonishadi!
      </h3>
      <p className="text-center mt-5 text-lg max-w-3xl mx-auto">
        Siz ham kiber hujumlar ko'paygan bir paytda, kiber hujumlardan 
        himoyalaning va tizimlaringizni avtomatlashtiring!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-7xl mx-auto">
        {clients.map((client, index) => (
          <div
            key={index}
            className="card shadow-xl p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2"
          >
            <img
              src={client.image}
              alt={client.name}
              className={`w-64 h-64 rounded-xl shadow-md border mx-auto ${client.imageClass}`}
            />
            <p className="text-xl mt-4 text-center font-serif">
              {client.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}