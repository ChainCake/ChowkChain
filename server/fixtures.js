if (Coll.Players.find().count() === 0) {
  const names = [
    'Ada Lovelace',
    'Grace Hopper',
    'Marie Curie',
    'Carl Friedrich Gauss',
    'Nikola Tesla',
    'Claude Shannon'
  ];

  for (let i = 0; i < names.length; i++) {
    Coll.Players.insert({name: names[i], score: Math.floor(Math.random() * 10) * 5});
  }
}
