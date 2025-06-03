// script.js
let currentSign = '';
let currentStream = null;
let filterImage = null;
let faceMesh = null;

async function loadFaceAPI() {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    ]);
}

// Load face-api models when the page loads
window.onload = loadFaceAPI;

function verSigno() {
    const fechaInput = document.getElementById("fechaNacimiento").value;
    const resultadoDiv = document.getElementById("resultado");
    const filterButton = document.querySelector(".filter-button");
  
    if (!fechaInput) {
      resultadoDiv.innerText = "Add a date";
      filterButton.style.display = "none";
      return;
    }
  
    const fecha = new Date(fechaInput);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Enero = 0
  
    const signo = calcularSigno(dia, mes);
    currentSign = signo.toLowerCase(); // Store the current sign
    const filtro = obtenerFiltroPorSigno(signo);
  
    resultadoDiv.innerHTML = `🌟 Your sign is <strong>${signo}</strong><br>${filtro}`;
    filterButton.style.display = "block";
}

function onResults(results) {
    const video = document.getElementById('video');
    const overlay = document.getElementById('overlay');
    const ctx = overlay.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    
    // Draw video frame
    ctx.drawImage(results.image, 0, 0, overlay.width, overlay.height);
    
    // If we have face landmarks and filter image is loaded
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0 && filterImage && filterImage.complete) {
        const face = results.multiFaceLandmarks[0];
        
        // Get eye positions
        const leftEye = face[33];  // Left eye center
        const rightEye = face[263]; // Right eye center
        
        // Calculate center point between eyes
        const centerX = (leftEye.x + rightEye.x) / 2;
        const centerY = (leftEye.y + rightEye.y) / 2;
        
        // Calculate eye distance for scaling
        const eyeDistance = Math.abs(leftEye.x - rightEye.x) * overlay.width;
        
        // Calculate filter position and size
        const scaleX = eyeDistance * 3.2;
        const scaleY = eyeDistance * 2;
        const x = (centerX * overlay.width) - (scaleX / 2);
        const y = (centerY * overlay.height) - (scaleY / 2);
        
        // Draw filter at full opacity
        ctx.drawImage(filterImage, x, y, scaleX, scaleY);
    }
}

async function viewFilter() {
    if (!currentSign) {
        alert("Please get your sign first!");
        return;
    }

    try {
        const video = document.getElementById('video');
        const overlay = document.getElementById('overlay');
        const cameraContainer = document.getElementById('camera-container');

        // Request camera permission
        currentStream = await navigator.mediaDevices.getUserMedia({ 
            video: true
        });

        // Set up video stream
        video.srcObject = currentStream;
        
        // Show camera container
        cameraContainer.style.display = 'block';

        // Wait for video to be ready
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                // Set canvas size to match video
                overlay.width = video.videoWidth;
                overlay.height = video.videoHeight;
                resolve();
            };
        });

        // Load filter image
        filterImage = new Image();
        filterImage.onload = () => {
            console.log('Filter loaded successfully:', {
                width: filterImage.width,
                height: filterImage.height,
                src: filterImage.src
            });
        };
        filterImage.onerror = (e) => {
            console.error('Error loading filter:', e);
            alert('Error loading filter image');
        };
        filterImage.src = `img/${currentSign}.PNG`;

        // Initialize Face Mesh
        faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        faceMesh.onResults(onResults);

        // Start camera
        const camera = new Camera(video, {
            onFrame: async () => {
                await faceMesh.send({image: video});
            },
            width: 1280,
            height: 720
        });
        camera.start();

    } catch (error) {
        if (error.name === 'NotAllowedError') {
            alert("Camera access was denied. Please allow camera access to use the filter.");
        } else {
            alert("Error starting camera: " + error.message);
        }
    }
}

function closeCamera() {
    const cameraContainer = document.getElementById('camera-container');
    const video = document.getElementById('video');
    const overlay = document.getElementById('overlay');
    
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
    
    if (video) {
        video.srcObject = null;
    }

    if (overlay) {
        const ctx = overlay.getContext('2d');
        ctx.clearRect(0, 0, overlay.width, overlay.height);
    }
    
    cameraContainer.style.display = 'none';
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

function downloadImage() {
    const overlay = document.getElementById('overlay');
    const link = document.createElement('a');
    
    // Get the current zodiac sign for the filename
    const filename = `${currentSign}_filter_${new Date().toISOString().slice(0,10)}.png`;
    
    // Convert canvas to blob
    overlay.toBlob((blob) => {
        // Create object URL
        const url = URL.createObjectURL(blob);
        
        // Set up download link
        link.href = url;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 'image/png');
}
  