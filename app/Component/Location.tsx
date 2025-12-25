export default function Location() {
  return (
    <>
      <h3 className="text-5xl text-center font-bold font-mono mt-20">
        Bizga ishonishadi!</h3>
      <p  className="text-center mt-5 text-lg">Siz ham kiber hujumlar ko'paygan bir paytda,kiber hujumlardan himoyalaning va tizimlaringizni avtomatlashtiring!</p>

     
      <div className="flex flex-col md:flex-row gap-6 justify-evenly items-center mt-10 px-4">
        <img
          src="https://i.ibb.co/RGgMB1St/381738538.jpg"
          alt="Image 1"
          className="w-64 h-64 object-cover rounded-xl shadow-2xl"
        />
      
        <img
          src="https://i.ibb.co/0kRNWsd/download.png"
          alt="Image 2"
          className="w-64 h-64 object-contain rounded-xl shadow-md"
        />
      </div>

     
      <div className="flex flex-col md:flex-row gap-6 justify-evenly items-center mt-10 px-4">
        <img
          src="https://i.ibb.co/7xHGHcNJ/logo.png"
          alt="Image 3"
          className="w-64 h-64 object-contain rounded-xl shadow-md"
        />
        <img
          src="https://i.ibb.co/jPjg8HDx/5922378.jpg"
          alt="Image 4"
          className="w-64 h-64 object-cover rounded-xl shadow-md"
        />
      </div>



        <div className="flex flex-col md:flex-row gap-6 justify-evenly items-center mt-10 px-4">
        <img
          src="https://i.ibb.co/xt5ZBQ3Q/download.png"
          alt="Image 3"
          className="w-64 h-64 object-contain rounded-xl shadow-md"
        />
        <img
          src="https://i.ibb.co/vyp8yk5/download.jpg"
          alt="Image 4"
          className="w-64 h-64 object-cover rounded-xl shadow-md"
        />
      </div>
    </>
  );
}
