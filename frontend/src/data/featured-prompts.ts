export const featuredPrompts = [
    {
      id: "tesla-reveal",
      brand: "Tesla",
      title: "Tesla Showroom Magic Reveal",
      description:
        "A cinematic transformation of a glowing Tesla crate into a fully assembled minimalist Tesla showroom, all without text.",
      prompt: {
        description:
          "Cinematic shot of a minimalist Tesla-branded crate magically opening to reveal a fully formed Tesla vehicle and an instantly assembled, sleek Tesla-themed showroom around it. No text.",
        style: "cinematic",
        camera: "fixed wide angle, with subtle zooms on key transformations",
        lighting:
          "controlled, high-tech, transitioning from dim to bright and clean",
        room: "empty futuristic space transforming into a minimalist Tesla showroom",
        elements: [
          "Tesla-branded crate (glowing seams)",
          "Tesla vehicle (e.g., Model 3/Y/Cybertruck)",
          "charging station",
          "minimalist display panels",
          "sleek showroom furniture",
          "ambient lighting elements"
        ],
        motion:
          "crate panels retract smoothly and silently, car revealed, showroom elements rise/unfold precisely and rapidly",
        ending:
          "pristine, inviting Tesla showroom with car as centerpiece",
        text: "none",
        keywords: [
          "16:9",
          "Tesla",
          "magic assembly",
          "showroom",
          "innovation",
          "futuristic",
          "no text",
          "clean design",
          "reveal"
        ]
      },
      mediaType: "video",
      tags: ["cinematic", "Tesla", "no text", "futuristic"],
      views: "1.2M",
      videoUrl: "https://www.youtube.com/embed/xyz123"
    },
    {
      id: "pepsi-city-festival",
      brand: "Pepsi",
      title: "Pepsi City Transformation Festival",
      description:
        "From a frosty Pepsi can to a full-blown futuristic city rave with holograms and light shows. No text.",
      prompt: {
        description:
          "Cinematic ultra-close-up of a cold, frosty Pepsi can... (full prompt omitted for brevity)",
        style: "cinematic, dynamic, magical futurism",
        camera:
          "starts ultra close on condensation dripping from the Pepsi can, zooms out and orbits as the cityscape transforms around it in real-time",
        lighting:
          "daylight fading into vibrant neon blues, reds, and purples—cyberpunk festival glow",
        environment:
          "quiet futuristic plaza transforms into a high-energy city-scale holographic party",
        motion:
          "continuous chain reaction from the can opening—liquid energy flows, triggers rapid city transformation in dynamic, seamless time-lapse",
        ending:
          "Pepsi can in foreground, the whole futuristic city in full festival mode behind it, pulsing with light and music",
        text: "none",
        keywords: [
          "Pepsi",
          "urban festival",
          "futuristic party",
          "city transforms",
          "dynamic animation",
          "holographic concert",
          "hyper-realistic",
          "cinematic",
          "no text"
        ]
      },
      mediaType: "video",
      tags: ["Pepsi", "cyberpunk", "holograms", "festival"],
      views: "980k",
      videoUrl: "https://www.youtube.com/embed/abc456"
    }
];
  
export type Prompt = typeof featuredPrompts[number];