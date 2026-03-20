import { useContext, useEffect } from 'react'; 
import Home from './Home'
import { ThemeContext } from '../../../context/ThemeContext';

const DashboardDark = () => {
	const { changeBackground } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	
	return (
		<>
			<Home />
		</>
	)
}
export default DashboardDark;