import { useState } from "react";
import confetti from "canvas-confetti";

function HappyBirthday() {
    const [clicked, setClicked] = useState(false);

    function action() {
        setClicked(true);

        // Big confetti burst
        confetti({
            particleCount: 250,
            spread: 180,
            origin: { y: 0.6 }
        });

        // Side cannons
        confetti({
            particleCount: 120,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 120,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        // Continuous confetti
        let duration = 3000;
        let end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 80,
                origin: { x: 0 }
            });

            confetti({
                particleCount: 4,
                angle: 120,
                spread: 80,
                origin: { x: 1 }
            });

            if (Date.now() < end)
                requestAnimationFrame(frame);
        })();
    }

    return (
        <div className={`birthday ${clicked ? "party" : ""}`}>
            <style>{`
                body{
                    margin:0;
                    overflow:hidden;
                    font-family:'Segoe UI';
                }

.birthday{
    position: fixed;
    inset: 0;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    background: linear-gradient(160deg, #1d3557 0%, #2a4f7d 100%);
    color:white;

    transition:1s;
    overflow:hidden;
}

.party{
    background:linear-gradient(160deg,#2f4f8f,#5c258d);
    animation:shake .35s, glow 4s infinite alternate;
}

                @keyframes gradient{
                    0%{background-position:0% 50%;}
                    50%{background-position:100% 50%;}
                    100%{background-position:0% 50%;}
                }

                @keyframes shake{
                    0%{transform:translate(0);}
                    20%{transform:translate(-4px,2px);}
                    40%{transform:translate(5px,-2px);}
                    60%{transform:translate(-5px,3px);}
                    80%{transform:translate(4px,-3px);}
                    100%{transform:translate(0);}
                }

                h1{
                    font-size:4rem;
                    color: white;
                    margin:0;
                    text-shadow:0 0 20px rgba(255,255,255,.25);
                    animation:float 3s ease-in-out infinite;
                    margin:0 0 20px 0;
                }

                p{
                    font-size:1.5rem;
                    margin:15px;
                    border: 20px;
                }

                button{
                    margin-top:20px;
                    padding:15px 35px;
                    border:none;
                    border-radius:50px;
                    cursor:pointer;
                    font-size:18px;
                    background:#ffcf33;
                    color:#222;
                    transition:.3s;
                    box-shadow:0 10px 25px rgba(0, 0, 0, 0.3);
                }

                button:hover{
                    transform:scale(1.08);
                }

                .party button{
                    background:#ff4081;
                    color:white;
                    animation:pulse 1s infinite;
                }

                @keyframes pulse{
                    0%{transform:scale(1);}
                    50%{transform:scale(1.12);}
                    100%{transform:scale(1);}
                }

                @keyframes float{
                    0%,100%{transform:translateY(0);}
                    50%{transform:translateY(-10px);}
                }

                .emoji{
                    position:absolute;
                    font-size:40px;
                    animation:fall linear infinite;
                    pointer-events:none;
                }

                @keyframes fall{
                    from{
                        transform:translateY(-120px) rotate(0deg);
                        opacity:1;
                    }

                    to{
                        transform:translateY(120vh) rotate(360deg);
                        opacity:0;
                    }
                }
            `}</style>

            {clicked &&
                [...Array(35)].map((_, i) => (
                    <span
                        key={i}
                        className="emoji"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${4 + Math.random() * 5}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    >
                        {["🎉", "🎊", "🎈", "✨"][Math.floor(Math.random() * 4)]}
                    </span>
                ))}

            <h1>Happy Birthday, Baba!</h1>

            <p>كل سنة وانت طيب :D</p>

            <button onClick={action}>
                {clicked ? "بخ" : "Click here for no reason"}
            </button>
        </div>
    );
}

export default HappyBirthday;