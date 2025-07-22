import { useState } from 'react'
import ThemeContext from './context/ThemeContext';
import type {ThemeType} from './context/ThemeContext';
import {themes} from './context/themes';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

interface State {
	theme:ThemeType;
}

function App() {
  const [state, setState] = useState<State>({
	  theme:themes.dark
  })
  
  const toggleTheme = () => {
	  if(state.theme === themes.dark) {
		  setState({
			  theme:themes.light
		  })
	  } else {
		  setState({
			  theme:themes.dark
		  })
	  }
  }

  return (
    <>
	<ThemeContext.Provider value={state.theme}>
		<Headline>
		Keskon tulos notkahti vuoden toisella neljänneksellä
		</Headline>
		<Paragraph>
		Kauppakonserni Keskon vertailukelpoinen liikevoitto oli huhti-kesäkuussa 176,7 miljoonaa euroa.

		Tulos laski hieman vuoden takaisesta, jolloin se oli 178,3 miljoonaa.

		Keskon liikevaihto oli huhti–kesäkuussa noin 3,19 miljardia euroa. Liikevaihto kasvoi vertailukelpoisesti 1,3 prosenttia viime vuoden vastaavaan ajankohtaan verrattuna.
		</Paragraph>
		<ThemeButton toggleTheme={toggleTheme}/>
	</ThemeContext.Provider>
	</>
  )
}

export default App
