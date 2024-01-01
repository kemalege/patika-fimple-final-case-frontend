import { useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { PiSunFill } from 'react-icons/pi';
import { HiMoon } from 'react-icons/hi';

const ThemeSwitcher = () => {

  const { colorMode, toggleColorMode } = useColorMode()
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const chakraMode = localStorage.getItem('chakra-ui-color-mode');
    if (chakraMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toggleColorMode()
  };
  return (
    <button onClick={handleThemeSwitch}>
       {colorMode === 'light' ? <HiMoon className="text-xl text-gray-800 transition-opacity duration-500"/> :
            <PiSunFill className="text-xl text-gray-300 transition-opacity duration-500"/>}
    </button> 
  )
}

export default ThemeSwitcher