// =============================================================================
// ALL EDITABLE CONTENT LIVES HERE.
// No text, links, or image paths should ever be hardcoded inside components —
// if it needs to change, it belongs in this file.
//
// See README-edit.md in the project root for a step-by-step guide (in Russian)
// on how to edit this file without touching any code.
// =============================================================================

export type StoryEvent = {
  date?: string; // "YYYY-MM-DD" — optional, leave it out if you don't remember the exact date
  title: string;
  text: string;
  images: string[]; // paths under /public, e.g. ["/img/first-call.jpg"] — 0, 1, or more. Empty array shows a placeholder.
};

export type Track = {
  title: string;
  artist: string;
  youtubeId: string;
};

export type FutureMemory = {
  caption: string;
  image: string | null;
};

export type Dream = {
  title: string;
  text?: string; // optional — some dreams are just a title, no extra line needed
};

export type Message = {
  type: "youtube" | "video" | "audio";
  src: string;
  note?: string;
} | null;

export type Place = {
  label: string;
  lat: number;
  lng: number;
  fact?: string;
};

export type Content = {
  meta: {
    startedAt: string; // ISO datetime
    anniversaryAt: string; // ISO datetime
    girlName: string;
    // Optional pet name used only on the final closing screen ("Happy
    // anniversary, ___"). Leave unset to just reuse girlName there too.
    closingName?: string;
    fromName: string;
    siteTitle: string;
    reveal: {
      enabled: boolean;
      at: string;
    };
  };
  story: StoryEvent[];
  music: {
    featured: {
      title: string;
      youtubeId: string;
      note: string;
    };
    playlist: {
      youtubePlaylistId: string;
      tracks: Track[];
    };
  };
  reasons: string[];
  futureMemories: FutureMemory[];
  dreams: Dream[];
  callGallery: string[];
  message: Message;
  places: {
    from: Place;
    to: Place;
  };
};

export const content: Content = {
  meta: {
    // Point in time the relationship began — powers the live "Time Together" counter.
    startedAt: "2025-07-17T00:00:00+03:00",
    // Anniversary date — used only if reveal.enabled is switched on below.
    anniversaryAt: "2026-07-17T00:00:00+03:00",
    girlName: "Malak",
    closingName: "Honey",
    fromName: "Kirill",
    siteTitle: "For Malak, with love",
    // Gate-countdown / "reveal" on the anniversary date. OFF by default —
    // flip to true when you're ready and the site will show a countdown
    // until anniversaryAt, then unlock itself automatically.
    reveal: {
      enabled: false,
      at: "2026-07-17T00:00:00+03:00",
    },
  },

  // --- Our Story: timeline -------------------------------------------------
  // Replace/add entries. Keep them in chronological order. `images: []` shows
  // a soft placeholder instead of breaking the layout. `images` can hold as
  // many photos as you want — 1, 2, or more — and they'll lay out side by side.
  story: [
    {
      date: "2025-06-23",
      title: "June 23",
      text: "The day when we first met",
      images: ["/img/photo-1.jpg", "/img/photo-2.jpg"],
    },
    {
      date: "2025-07-17",
      title: "July 17 ",
      text: "The day when we finally decided to give us a chance and it was the best decision we could ever do. The day that changed everything",
      images: ["/img/photo-3.jpg"],
    },
    {
      date: "2025-07-28",
      title: "First call",
      text: "The day when we finally decided to make our first call and hear each other for the first time (you was really nervous😭😭)",
      images: ["/img/photo-4.jpg", "/img/photo-5.jpg"],
    },
    {
      title: "Our videos",
      text: "Millions of reels and it all has started with these ones",
      images: ["/img/photo-6.jpg"],
    },
	{
      title: "Our photos",
      text: "And thousands and thousands of pictures (I still wish it could be even more)",
      images: ["/img/photo-7.jpg", "/img/photo-8.jpg"],
    },
	{
      title: "Our words",
      text: "And, of course, the words that mean for me everything",
      images: ["/img/photo-9.jpg", "/img/photo-10.jpg"],
    },
  ],

  // --- Our Music -------------------------------------------------------------
  music: {
    featured: {
      title: "La Vie en Rose",
      youtubeId: "h6gdF8ynJDo", // paste the YouTube video ID (the part after v=)
      note: "Honey, you know, “La vie en rose” for me was really special song because it’s a song from my favorite tv show “How I met your mother” and for me it always was a symbol of a hope. Hope that one day I will tell my kids the story of how I met their mom, a hope that I will find a person who will understand me with every my complicated side. The person I will want to get older with and spend my whole life. The person I can just be myself with. The person I will see as the love of my life. And when we found each other I wanted you to know this song and what it means to me because I know and I know it for sure: this person is you, baby. Every time I hear it, I don’t just hear the melody, I hear you. I remember the very first time  when you sang it to me, when you learned how to play it in piano, you did it for me, because you knew what it means, when your voice made the whole world go quiet. This song became a place where I can always find you, even when you’re thousands of kilometers away. One day I want to listen to it not through my headphones, but while holding you in my arms. Until then, every note reminds me of you, honey. 🥺🤍",
    },
    playlist: {
      youtubePlaylistId: "PLN34l6zsAYDI", // optional: a full YouTube playlist ID as fallback
      tracks: [
        { title: "Track title 1", artist: "Artist name", youtubeId: "" },
        { title: "Track title 2", artist: "Artist name", youtubeId: "" },
        { title: "Track title 3", artist: "Artist name", youtubeId: "" },
      ],
    },
  },

  // --- Reasons I'm grateful for you ------------------------------------------
  // Aim for ~50. Add as many lines as you want, any time.
  reasons: [
    "Because you make ordinary days feel like something worth remembering.",
    "Because you listen, really listen, even with a bad connection.",
    "Because your voice and your laugh is the best part of my morning.",
    "Because you remember the small things I mention once.",
    "Because you make distance feel smaller than it is.",
    "Because you laugh at my worst jokes (that’s what she said).",
    "Because you're honest, even when it's easier not to be.",
    "Because you make me want to be better, without ever asking me to.",
    "Because your good morning texts are the first thing I look forward to.",
    "Because you notice when something's wrong before I say it.",
    "Because you believe in things we haven't done yet.",
    "Because you make plans for a future you're sure of.",
    "Because you're curious about my world, even the boring parts.",
    "Because you say what you mean.",
    "Because your calm my crazy mind on loud days.",
    "Because you keep showing up, call after call.",
    "Because you make me feel chosen, not just loved.",
    "Because you have opinions about everything and I love hearing them.",
    "Because you're kind to all the animals and good people.",
    "Because you never make me feel far away.",
    "Because your excitement over small wins is contagious.",
    "Because you take care of the once you love, fiercely.",
    "Because you make me laugh sometimes so hard it’s difficult to breathe.",
    "Because you ask good questions.",
    "Because you remember our songs, and what they mean.",
    "Because you're brave about a relationship most people said was too hard.",
    "Because your texts read exactly like your voice.",
    "Because you make Cairo feel like a place I already know.",
    "Because you're patient with my bad Arabic pronunciation.",
    "Because you never let a hard day go unnoticed.",
    "Because you plan our future out loud, and it sounds like home.",
    "Because you trust me  a lot, you trust me with the parts of you that are still healing.",
    "Because you make time for me even when you feel so tired and you feel like you’re gonna go crazy from everything.",
    "Because you're stubborn about the right things.",
    "Because you send me songs that make you think of me.",
    "Because your morning voice and your late-night voice are both mine to know.",
    "Because you make me feel like distance is temporary and we are not.",
    "Because you ask 'did you eat' before anything else.",
    "Because you remember all the things about us.",
    "Because you're proud of me out loud.",
    "Because you never once made me feel like a burden.",
    "Because you feel and you feel a lot. And you trust me with everything you think and feel about.",
    "Because you make the wait for 'in person' feel worth it.",
    "Because you say every I love you, every good morning and every goodnight like it matters.",
    "Because you're the calm in my chaos.",
    "Because you want us to spend every single little moment together such as noodles date, movie night or when you are making a birthday card for Hoda or you are teasing me with something you are making for me.",
    "Because you chose this, chose us, over and over.",
    "Because even after hundreds of hours together, we still find new things to tell each other.",
    "Because you can make me feel at home without us even being in the same continent.",
    "Because only you can calm me when I’m going up on the big escalator in the metro just by being with me.",
  ],


  // --- Future Memories: empty polaroids waiting to be filled -----------------
  futureMemories: [
    { caption: "First hug", image: null },
    { caption: "First kiss", image: null },
    { caption: "First meeting", image: null },
    { caption: "Our first picture together", image: null },
    { caption: "First trip", image: null },
    { caption: "Meeting the family", image: null },
  ],

  // --- Our Dreams / What's ahead ----------------------------------------------
  dreams: [
    {
      title: "Finally seeing each other at the airport",
      text: "The moment when we will finally be standing in front of each other and I will finally be able to see your smile so close and so real.",
    },
    {
      title: "Our first real hug",
      text: "Just finally holding each other and realizing that after all this time, after all this waiting, we're really here, together.",
    },
    {
      title: "Spending a completely ordinary day together",
      text: "Going for a walk, buying snacks, arguing about what movie to watch, doing absolutely nothing special and loving every second of it.",
    },
    {
      title: "Meeting Mushmushi together",
      text: "So I can finally see in person the one who you truly love more (kidding kidding!!!).",
    },
    {
      title: "Watching millions and millions movies and cartoons together.",
      text: "This time not in the website, just you and me, in person.",
    },
    {
      title: "Visiting a lot of beautiful places around the world.",
      text: "Japan, Brazil, Italy, Alexandria, Sweden, just all the corners of our planet.",
    },
    {
      title:
        "Getting married and building our home together (the moment we're waiting for and remembering every single day — and, of course, we will build this room full of noodles, and that olive sofa too).",
    },
    {
      title: "Dancing in the kitchen while making food.",
      text: "Sounds pretty basic, but that's what I really want, to listen to thousands and thousands of our beloved songs together.",
    },
    {
      title: "Watching sunsets and sunrises while drinking coffee on our balcony.",
    },
    {
      title: "Cooking all the food we were craving all this time.",
      text: "Yeah yeah, macaroni béchamel, and a lot of cheesy stuff, A LOT.",
    },
    {
      title: "Looking at stars and planets together in the night with a telescope.",
      text: "I hope that by that time I will finally be able to make it 😭😭",
    },
    {
      title: "Speaking our three languages (actually there are four languages) in one conversation.",
      text: "Confusing everyone around us while understanding each other perfectly.",
    },
    {
      title: "Celebrate all the different holidays, starting with Eid, and ending with a Russian New Year.",
    },
    {
      title: "Build a family with you. Big and full of love and life.",
    },
    {
      title: "Take millions of pictures of us.",
      text: "(Even the ones you will not be waiting for) and build the book of our family for new generations.",
    },
    {
      title: "Making art together.",
      text: "I want you to teach me a lot of things, to do your hobbies together (I'm not that hopeless about it 😭😭).",
    },
    {
      title: "Growing old together.",
      text: "Still teasing each other, still making stupid jokes and still being each other's favorite person (tbh, I don't know what will we do with \"we should get married\" 🙂🙂).",
    },
  ],

  // --- Call screenshots gallery (optional) ------------------------------------
  callGallery: [],

  // --- A message from me -------------------------------------------------------
  // Set to null to hide this section entirely — nothing breaks.
  // Example: { type: "youtube", src: "dQw4w9WgXcQ" }
  message: null,

  // --- The Distance: two points on the map -------------------------------------
  places: {
    from: {
      label: "Yaroslavl / Moscow",
      lat: 55.75,
      lng: 37.62,
      fact: "Where the messages come from.",
    },
    to: {
      label: "Cairo",
      lat: 30.04,
      lng: 31.24,
      fact: "Where they land.",
    },
  },
};
