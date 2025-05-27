// script.js
function verSigno() {
    const fechaInput = document.getElementById("fechaNacimiento").value;
    const resultadoDiv = document.getElementById("resultado");
  
    if (!fechaInput) {
      resultadoDiv.innerText = "Add a date";
      return;
    }
  
    const fecha = new Date(fechaInput);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Enero = 0
  
    const signo = calcularSigno(dia, mes);
    const filtro = obtenerFiltroPorSigno(signo);
  
    resultadoDiv.innerHTML = `🌟 Your sign is <strong>${signo}</strong><br>${filtro}`;
  }
  
  function calcularSigno(dia, mes) {
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return "Aquarius";
    if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return "Pisces";
    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return "Aries";
    if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return "Taurus";
    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return "Gemini";
    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return "Cancer";
    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return "Leo";
    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return "Virgo";
    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return "Libra";
    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return "Scorpio";
    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return "Sagittarius";
    return "Capricorn";
  }
  
  function obtenerFiltroPorSigno(signo) {
    const filtros = {
        Aries: "🔥Aries is pure impulse. Acts first, thinks later. Lives fast, feels deeply, and brings energy wherever they go. If something seems boring, they'll set it on fire (figuratively... or maybe not).",
        
        Taurus: "🌿Taurus is steady wrapped in velvet. They love simple pleasures, stable routines, and long hugs. But beware—don't move them without reason: they're sweet, but stubborn as a rock.",
        
        Gemini: "💨Curious, adaptable, with a million tabs open in their mind. Gemini has countless versions of themselves and changes moods like songs. They always know something you don't.",
        
        Cancer: "🌙Feels everything. Cancer is home, intuition, and memories. Cries over things they won't say, and loves with a disarming intensity. If they care about you, they'll protect you.",
        
        Leo: "🌟It's not that they *want* attention... it just follows them. Leo is magnetic, bold, and generous. They shine without asking permission—and if they trust you, they'll take you to the top.",
        
        Virgo: "📐Order in chaos. Virgo analyzes not out of obsession, but out of love for things done right. Practical, perfectionist, and calm—yet hiding a mind that's always racing.",
        
        Libra: "⚖️All about harmony. Libra needs balance like air. Loves conversation, beautiful surroundings, and mediating even in silence. They know what looks good... and what feels better.",
        
        Scorpio: "🦂Scorpio sees beyond. Their gaze pierces, and their heart is volcanic—guarding secrets. They don't play games, and if they trust you, it's for life.",
        
        Sagittarius: "🏹Laughs loud, thinks big, and never stays still. Sagittarius moves through life like an unmapped journey: it's all about the road, the freedom, and the stories they leave behind.",
        
        Capricorn: "⛰️Capricorn climbs slow but sure. Focused, disciplined, and always delivering. A quiet strength that impresses without shouting. Always one step ahead, even if you don't notice.",
        
        Aquarius: "🔮Aquarius runs on a different operating system. Original, rebellious, full of ideas that seem strange—until they make sense. They don't need to fit in, just space to create.",
        
        Pisces: "🌊Pisces doesn't walk—they float. Sensitive beyond this world, seeing signs in the everyday, and connecting with emotion like it's their native language. They might seem far... but they're dreaming."
    };
    
    return filtros[signo] || "No encontré tu filtro... ¿Eres de otro planeta?";
  }
  