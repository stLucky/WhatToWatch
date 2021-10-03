import FilmCard from '../film-card/film-card';

const listFilms = [
  {
    img: 'fantastic-beasts-the-crimes-of-grindelwald.jpg',
    title: 'Fantastic Beasts: The Crimes of Grindelwald',
  },
  {
    img: 'bohemian-rhapsody.jpg',
    title: 'Bohemian Rhapsody',
  },
  {
    img: 'macbeth.jpg',
    title: 'Macbeth',
  },
  {
    img: 'aviator.jpg',
    title: 'Aviator',
  },
  {
    img: 'we-need-to-talk-about-kevin.jpg',
    title: 'We need to talk about Kevin',
  },
  {
    img: 'what-we-do-in-the-shadows.jpg',
    title: 'What We Do in the Shadows',
  },
  {
    img: 'revenant.jpg',
    title: 'Revenant',
  },
  {
    img: 'johnny-english.jpg',
    title: 'Johnny English',
  },
  {
    img: 'shutter-island.jpg',
    title: 'Shutter Island',
  },
  {
    img: 'pulp-fiction.jpg',
    title: 'Pulp Fiction',
  },
  {
    img: 'no-country-for-old-men.jpg',
    title: 'No Country for Old Men',
  },
  {
    img: 'snatch.jpg',
    title: 'Snatch',
  },
  {
    img: 'moonrise-kingdom.jpg',
    title: 'Moonrise Kingdom',
  },
  {
    img: 'seven-years-in-tibet.jpg',
    title: 'Seven Years in Tibet',
  },
  {
    img: 'midnight-special.jpg',
    title: 'Midnight Special',
  },
  {
    img: 'war-of-the-worlds.jpg',
    title: 'War of the Worlds',
  },
  {
    img: 'dardjeeling-limited.jpg',
    title: 'Dardjeeling Limited',
  },
  {
    img: 'orlando.jpg',
    title: 'Orlando',
  },
  {
    img: 'mindhunter.jpg',
    title: 'Mindhunter',
  },
  {
    img: 'midnight-special.jpg',
    title: 'Midnight Special',
  },
];

function FilmsList(): JSX.Element{
  return (
    <div className="catalog__films-list">
      {listFilms.map((film) => <FilmCard  image={film.img} title={film.title} key={film.title}/>)}
    </div>
  );
}

export default FilmsList;
