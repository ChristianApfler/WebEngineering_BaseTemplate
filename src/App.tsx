import React, { useEffect, useState } from 'react';
import CommentSection from './CommentSection';
import BearList from './BearList';
import { getBearData, extractBears } from './api';
import './style.css';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const App: React.FC = () => {
  const [bears, setBears] = useState<Bear[]>([]); // Specify the type of bears
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBears = async () => {
      const params = {
        action: 'parse',
        page: 'List_of_ursids',
        prop: 'wikitext',
        section: '3',
        format: 'json',
        origin: '*',
      };

      try {
        const wikitext = await getBearData(params);
        const bearData = await extractBears(wikitext);
        setBears(bearData); // No error now, since Bear[] matches the type
      } catch (err) {
        setError('Failed to fetch bear data.');
        console.error(err);
      }
    };

    fetchBears();
  }, []);

  return (
    <div className="main-content">
      <div className="header">
        <h1>Welcome to our wildlife website</h1>
      </div>

      <div className="nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Our teams</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>
        <form className="search">
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <input
            type="search"
            name="q"
            id="search-input"
            placeholder="Search query"
          />
          <input type="submit" value="Go!" />
        </form>
      </div>

      <main className="content-wrapper">
        <article>
          <h2>The trouble with Bears</h2>
          <p>By Evan Wild</p>
          <p>
            Tall, lumbering, angry, dangerous. The real live bears of this world
            are proud, independent creatures, self-serving and always on the
            hunt for food. Nothing like the bears you see on TV, like Baloo from
            renowned documentary, The Jungle Book.
          </p>
          <p>
            So what are bears really like, and why does the world's media
            portray them with such a skewed vision? In this article we try to
            answer those questions, and give you a real insight into the life of
            the bear.
          </p>
          <h3>Types of bear</h3>
          <p>
            Bears come in two varieties — large and medium. You don't get small
            bears. If you have seen a small bear, then it was in fact probably a
            baby bear (cub) from another species.
          </p>
          <p>
            Bears can also be classified in terms of their habitat — both large
            and medium bears are just as at home in urban areas as they are in
            the countryside. Different habitats encourage different behaviour
            however, as you'll find out below. The below table also gives you
            some useful facts about bears.
          </p>
          <table>
            <thead>
              <tr>
                <th>Bear Type</th>
                <th>Coat</th>
                <th>Adult size</th>
                <th>Habitat</th>
                <th>Lifespan</th>
                <th>Diet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wild</td>
                <td>Brown or black</td>
                <td>1.4 to 2.8 meters</td>
                <td>Woods and forests</td>
                <td>25 to 28 years</td>
                <td>Fish, meat, plants</td>
              </tr>
              <tr>
                <td>Urban</td>
                <td>North Face</td>
                <td>18 to 22</td>
                <td>Condos and coffee shops</td>
                <td>20 to 32 years</td>
                <td>Starbucks, sushi</td>
              </tr>
            </tbody>
          </table>

          <h3>Habitats and Eating habits</h3>
          <p>
            Wild bears eat a variety of meat, fish, fruit, nuts, and other
            naturally growing ingredients. In general, they will hunt for food
            themselves in woodland or rivers, but at a push they will track down
            their sustenance from farms or country houses. They tend to live in
            relative isolation, in caves, tents, or cottages.
          </p>
          <img src="media/wild-bear.jpg" alt="Wild Bear" />
          <p>
            Urban (gentrified) bears on the other hand have largely abandoned
            the old ways. They will hunt other urban creatures if necessary
            (including other predators like rats and foxes), but prefer to
            scavenge from readily available urban food outlets like dumpsters,
            bins, and fast food joints. When food has proven scarce, urban bears
            have even been known to break into people's kitchens and steal
            essentials like baked beans, ready meals, and microwave ovens.
          </p>
          <img src="media/urban-bear.jpg" alt="Urban Bear" />
          <p>
            Urban bears will sleep anywhere they can, from bus shelters and
            parks to the toilets in McDonald's to their own apartment.
          </p>
          <h3>Mating rituals</h3>
          <p>
            Bears are romantic creatures by nature and will naturally look for a
            mate that they can spend the rest of their lives with. They will woo
            a potential suitor by making their dwelling look attractive — for
            example with cave paintings or a bed of reeds in the case of a wild
            bear, and mood lighting and a Michael Bublé CD in the case of an
            urban bear.
          </p>
          <h3>Audio Clip</h3>
          <p>
            The following audio clip contains a fact file providing more details
            about bear mating rituals, along with samples and quotes from
            experts.
          </p>

          <audio
            id="bear-audio"
            controls
            aria-label="Listen to the audio clip about bears"
          >
            <source src="media/bear.mp3" type="audio/mp3" />
            <source src="media/bear.ogg" type="audio/ogg" />
            <p>
              It looks like your browser doesn't support HTML5 audio players.
            </p>
          </audio>

          <h3>Transcript</h3>
          <p>This is a placeholder for the Transcript</p>

          <aside>
            <h3>About the author</h3>
            <p>
              Evan Wild is an unemployed plumber from Doncaster, who has been
              really "into" wildlife since childhood. He once went to Chester
              Zoo on holiday, but got ill after eating a doner kebab.
            </p>
            <p>
              He has never seen a bear, but once read a Daily Mail article about
              them, and thinks they sound cool.
            </p>
          </aside>

          <section className="comments">
            {/* Comment Section */}
            <CommentSection />
          </section>

          <section className="more_bears">
            <h2>More Bears</h2>
            {/* Bear List */}
            <BearList bears={bears} />
          </section>

          {error && <p className="error">{error}</p>}
        </article>

        {/* Sidebar with Related Articles */}
        <div className="secondary">
          <h2>Related</h2>
          <ul>
            <li>
              <a href="#">The trouble with Bees</a>
            </li>
            <li>
              <a href="#">The trouble with Otters</a>
            </li>
            <li>
              <a href="#">The trouble with Penguins</a>
            </li>
            <li>
              <a href="#">The trouble with Octopi</a>
            </li>
            <li>
              <a href="#">The trouble with Lemurs</a>
            </li>
          </ul>
        </div>
      </main>

      <footer>
        <p>©Copyright 2050 by nobody. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
