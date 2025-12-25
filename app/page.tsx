'use client'
import { useEffect, useState } from "react"
import Card from "../app/Component/Card"
import Location from "./Component/Location";

export default function Home() {
   const [isOpen, setIsOpen] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5 ,setInput5] = useState("");
  const [textarea, setTextarea] = useState("");

  const handleSubmit = async () => {
   
    if(!input1 || !input2 || !input3 || !input4 || !input5 || !textarea){
      alert("All fields are required!");
      return;
    }

    const data = {
      input1, input2, input3, input4,input5, textarea, time: new Date().toISOString()
    };

    try {
      const res = await fetch("http://localhost:5000/save", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert(result.message);

   
      setInput1(""); setInput2(""); setInput3(""); setInput4("");setInput5(""); setTextarea("");

    } catch(err){
      console.error(err);
      alert("Error sending data");
    }
  };

  return (
    <>
    <header className="bg-gray-800/80 shadow-lg shadow-gray-800/80 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-white text-3xl">Server ITuz</h2>

     
          <ul className="hidden md:flex gap-6 items-center">
            <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bosh sahifa</a></li>
            <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Biz haqimizda</a></li>
            <li><a href="#cards" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Servislarimiz</a></li>
            <li><a href="#manzil" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Manzil</a></li>
            <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bepul Consultatsiya olish</a></li>
          </ul>

 
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
           
              {isOpen ? (
                <span className="text-2xl">&#10005;</span> 
              ) : (
                <span className="text-2xl">&#9776;</span> 
              )}
            </button>
          </div>
        </div>

 
        <ul className={`md:hidden mt-4 flex flex-col gap-4 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}>
          <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bosh sahifa</a></li>
            <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Biz haqimizda</a></li>
            <li><a href="#cards" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Servislarimiz</a></li>
            <li><a href="#manzil" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Manzil</a></li>
            <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bepul Consultatsiya olish</a></li>
        </ul>
      </header>

              <main
      className="relative bg-gray-900 text-white py-32 flex items-center justify-center"
      style={{ 
        backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/002/883/759/small/illustration-of-world-and-network-photo.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-mono">Professional IT yechimlar bizda!</h1>
        <p className="text-lg text-gray-200 mb-8 font-mono">Web development, network security, automation, CCTV services.</p>
        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full shadow-lg transition-all duration-300">Bepul konsultatsiya</button>
      </div>
    </main>



     <div id="cards"> <Card/></div>
     <div id="manzil"><Location/></div>







       <h2 className="text-4xl font-bold text-black mb-6 text-center mt-20">
  Nima uchun bizni tanlashadi?
</h2>
<p className="text-gray-700 text-center mb-12">
  Biz mijozlarga eng samarali IT yechimlarni taqdim qilamiz, ish jarayonini soddalashtiramiz va xavfsizligini ta’minlaymiz.
</p>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-15">
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300">
    <h3 className="text-5xl font-bold text-blue-500">3+</h3>
    <p className="text-gray-300 mt-2">Yillik tajriba</p>
  </div>
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300">
    <h3 className="text-5xl font-bold text-green-500">20+</h3>
    <p className="text-gray-300 mt-2">Tugatgan loyiha</p>
  </div>
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300">
    <h3 className="text-5xl font-bold text-yellow-500">99%</h3>
    <p className="text-gray-300 mt-2">Mijozlar qoniqishi</p>
  </div>
  
</div>


<div className="text">
    <p className="text-center text-xl">Siz ham hoziroq IT yechimlarimizdan foydalaning va ishlaringizni osonlashtiring!</p>
  <br />
  <p className="text-center text-lg">Hoziroq bizga ariza qoldiring!</p>
</div>
<div className="flex justify-center items-center mt-20 mb-20">
<a href="#ariza"><button className="flex justify-center items-center bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-white">Ariza qoldirish!</button></a>
</div>























 <section className="py-32 bg-gray-900" id="ariza">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-4xl text-white font-bold mb-8">Xizmatlar uchun ariza qoldirish!</h2>
        <form className="space-y-6" >
          <input type="text" placeholder="Ismingiz" className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700" value={input1} onChange={e =>{setInput1(e.target.value)}} />
          <input type="text" placeholder="Familyangiz" className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700" value={input2} onChange={e =>{setInput2(e.target.value)}}/>
          <input type="email" placeholder="Email" className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700"  value={input3} onChange={e=>setInput3(e.target.value)}/>
          <input type="text" placeholder="Kompaniyangiz nomi...."  className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700" value={input4} onChange={e=>setInput4(e.target.value)}/>
          <input type="text" placeholder="Telefon raqamingizni qoldiring..."  className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700" value={input5} onChange={e=>setInput5(e.target.value)}/>
          <textarea placeholder="Xabar yuborish..." className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700" value={textarea} onChange={e=>setTextarea(e.target.value)}></textarea>
          <a href="#Main"><button type="submit" className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition" onClick={handleSubmit}>Send Message</button></a>
        </form>
      </div>
    </section>



     






















     <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">

      
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            IT Solutions
          </h3>
          <p className="text-sm">
            We provide modern IT services and digital solutions.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/services/web">Web Development</a>
            </li>
            <li>
              <a href="/services/security">Cyber Security</a>
            </li>
            <li>
              <a href="/services/ai">AI Solutions</a>
            </li>
            <li>
              <a href="/services/support">IT Support</a>
            </li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@itsolutions.com">
                info@itsolutions.com
              </a>
            </li>
            <li>
              <a href="tel:+998900000000">
                +998 90 000 00 00
              </a>
            </li>
            <li>Tashkent, Uzbekistan</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} IT Solutions. All rights reserved.
      </div>
    </footer>
    </>
  );
}
