import React from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { SideIcon } from '../../components/SideIcon';
import { AnimatedText } from '../../components/AnimatedText';
import { professions } from '../../utils/professions';

export function MyAccount() {
    return (
        <>
        <SideIcon/>
            <p className="App-title">GUIA DE&nbsp;<AnimatedText list={professions} delay={1500} /></p>
        <SearchBar/>
        </>
    );
}

export default MyAccount;