'use client'
import { useState } from "react";
export default function Ariza(){
      
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
      alert("Jo'natilmadi xatolik....!");
    }
  };
    return(
        <>
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
        </>
    )
}