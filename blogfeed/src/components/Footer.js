import React from 'react'

function Footer() {
    return (
        <div>
        <footer>
{/* <svg viewBox="0 0 120 28">
 <defs> 
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="
           1 0 0 0 0  
           0 1 0 0 0  
           0 0 1 0 0  
           0 0 0 13 -9" result="goo" />
      <xfeBlend in="SourceGraphic" in2="goo" />
  	</filter>
     <path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
  </defs> 

   <use id="wave3" class="wave" href="#wave" x="0" y="-2" ></use> 
   <use id="wave2" class="wave" href="#wave" x="0" y="0" ></use>
 
 
  <g class="gooeff" filter="url(#goo)">
  
  <circle class="drop drop1" cx="1.2" cy="2.4" r="8.8"  />
  <circle class="drop drop2" cx="5.2" cy="2.1" r="7.5"  />
  <circle class="drop drop3" cx="10.2" cy="2.3" r="9.2"  />
    <circle class="drop drop4" cx="3.2" cy=".4" r="8.8"  />
  <circle class="drop drop5" cx="14.2" cy="2.1" r="7.5"  />
  <circle class="drop drop6" cx="17.2" cy="2.8" r="9.2"  />
  <use id="wave1" class="wave" href="#wave" x="0" y="1" />
 </g>  
</svg> */}

  <div style={{backgroundColor: "rgb(237,102,99)"}}><a href="https://arghac14.github.io" style={{fontSize:"20px",color: "whitesmoke", fontWeight: "bold"}} >&copy; 2020 Arghadip Chakraborty</a></div>
</footer>
        </div>
    )
}

export default Footer
