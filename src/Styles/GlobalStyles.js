import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
	${reset};
	@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,700');
	* {
		box-sizing:border-box;
	}
	body {
		background-color: ${(props) => props.theme.bgColor};
		color: ${(props) => props.theme.blackColor};
		font-size:14px;
		font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ununtu, Cantarell, 'Open Sans', "Helvetica Nenu', sans-serif;
		padding-top:140px;
	}
	a {
		color: ${(props) => props.theme.blueColor}; 
		text-decoration:none;
	}
	input:focus{
		outline:none;
	}
`;
