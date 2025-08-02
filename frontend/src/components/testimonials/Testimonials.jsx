import React from "react";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Rahul Sharma",
      position: "JEE Aspirant",
      message:
        "The AI quiz generator is a game-changer! It helped me identify my weak spots in a very efficient way. Highly recommended for any serious student.",
      logoUrl: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=E55D87&color=fff",
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Olympiad Contender",
      message:
        "I've learned more here than in any other place. The interactive lessons and AI-powered tools make learning enjoyable and effective.",
      logoUrl: "https://ui-avatars.com/api/?name=Priya+Patel&background=F5B548&color=fff",
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "Student, Class 10",
      message:
        "This platform helped me learn complex topics so effectively. The courses are amazing and the instructors are top-notch.",
      logoUrl: "https://ui-avatars.com/api/?name=Amit+Kumar&background=A2D2FF&color=fff",
    },
    {
      id: 4,
      name: "Neha Singh",
      position: "Medical Aspirant",
      message:
        "The formula generator is a lifesaver! I can quickly get all the formulas for any chapter I'm struggling with, which saves so much time.",
      logoUrl: "https://ui-avatars.com/api/?name=Neha+Singh&background=84DCC6&color=fff",
    },
    {
        id: 5,
        name: "Vikram Gupta",
        position: "Student, Class 12",
        message:
          "The personalized recommendations are spot on. It feels like I have a personal tutor guiding my study plan. Thank you, Samarpan Math Academy!",
        logoUrl: "https://ui-avatars.com/api/?name=Vikram+Gupta&background=6B778D&color=fff",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Hear from Our Students
        </h2>

        {/* Testimonials Container - Horizontal Scroll */}
        <div className="flex flex-nowrap overflow-x-auto gap-8 pb-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
          {testimonialsData.map((e) => (
            <div
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 min-w-[320px] max-w-[320px] md:min-w-[350px] md:max-w-[350px] flex flex-col justify-between"
              key={e.id}
            >
              {/* Student Logo and Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img src={e.logoUrl} alt={e.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-900">{e.name}</p>
                  <p className="text-sm text-gray-500">{e.position}</p>
                </div>
              </div>

              {/* Testimonial Message */}
              <p className="text-gray-700 leading-relaxed italic mt-auto">"{e.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;