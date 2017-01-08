require("../../CSS/main.css");

import "babel-polyfill";
import "es5-sham";
import "es5-shim";
import "es6-promise";

import React from 'react';
import {render} from 'react-dom';
import HomeComponent from './content/home/HomeComponent'


render(
    <HomeComponent/>,
    document.getElementById('mount'));
