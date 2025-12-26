export default function Location() {
  return (
    <>
      <h3 className="text-5xl text-center font-bold font-mono mt-20">
        Bizga ishonishadi!</h3>
      <p  className="text-center mt-5 text-lg">Siz ham kiber hujumlar ko'paygan bir paytda,kiber hujumlardan himoyalaning va tizimlaringizni avtomatlashtiring!</p>

     
      <div className="flex flex-col md:flex-row gap-6 justify-evenly items-center mt-10 px-4">
        <div className="card shadow-xl p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2">
          <img src="https://i.ibb.co/RGgMB1St/381738538.jpg"alt="" className="w-64 h-64 object-cover rounded-xl shadow-2xl border-[1px]"/>
          <p className="text-xl mt-4 text-center font-serif">Hotel Inspera-S Tashkent</p>
        </div>
      
        <div className="card shadow-xl p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2">
          <img src="https://i.ibb.co/0kRNWsd/download.png" alt="" className="w-64 h-64 object-contain rounded-xl shadow-md border-[1px]"/>
          <p className="text-xl mt-4 text-center font-serif">Cambridge Learning Center</p>
        </div>
      </div>

     
      <div className="flex flex-col md:flex-row gap-6 justify-evenly items-center mt-10 px-4">
       <div className="card shadow-xl p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2">
        <img src="https://i.ibb.co/7xHGHcNJ/logo.png" alt="" className="w-64 h-64 object-contain rounded-xl shadow-md border-[1px] p-2"/>
        <p className="text-xl mt-4 text-center font-serif">Colba ta'lim markazi</p>
       </div>
       


       <div className="card shadow-xl p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2">
         <img src="https://i.ibb.co/jPjg8HDx/5922378.jpg" alt=""className="w-64 h-64 object-cover rounded-xl shadow-md border-[1px]"/>
         <p className="text-xl mt-4 text-center font-serif">Mars IT school</p>
       </div>
      </div>



        <div className="flex flex-col md:flex-row gap-6 justify-evenly items-center mt-10 px-4">
        <div className="card shadow-xl p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2">
          <img src="https://i.ibb.co/xt5ZBQ3Q/download.png" alt="" className="w-64 h-64 object-contain rounded-xl shadow-md border-[1px]"/>
          <p className="text-xl mt-4 text-center font-serif">DataLab company</p>
        </div>



        <div className="card shadow-xl p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2">
          <img src="https://i.ibb.co/vyp8yk5/download.jpg" alt=""className="w-64 h-64 object-cover rounded-xl shadow-md border-[1px]"/>
          <p className="text-xl mt-4 text-center font-serif">Gigu Fashion School</p>
        </div>
      </div>
    </>
  );
}
