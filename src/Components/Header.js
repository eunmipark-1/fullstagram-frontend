import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Compass, HeartEmpty, User } from './Icons';

const Header = styled.Header`
	width: 100%;
	border: 0;
	position: fixed;
	top: 0;
	left: 0;
	background-color: white;
	border-bottom: ${(props) => props.theme.boxBorder};
	border-radius: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 25px 0;
`;


const HeaderWrapper = styled.div`
	width:100%;
	max-width: ${props => props.theme.maxWidth};
	display:flex;
	justify-content:center;
`;

const HeaderColumn = styled.div`
	width:33%;
	text-align:center;
	&:first-child {
		margin-right:auto;
		text-align:left;
	}
	&:last-child{
		margin-left:auto;
		text-align:right;
	}
`;

const SearchInput = styled(Input)`
	background-color:${props -> props.theme.bgColor};
	padding:5px;
	font-size:14px;
	border-radius:3px;
	height:auto;
	text-align:center;
	width:80%;
	&:placeholder {
		opacity:0.8;
		font-weight:200;
	}
`;

