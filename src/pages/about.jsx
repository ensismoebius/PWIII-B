import { Link } from 'react-router-dom'
import hotguys from '../assets/Bakunin_&_Marx_&_malcon_&_sankara.png'
import hotgirls from '../assets/RosaLuxemburgo_&_AngelaDavis_&_LouiseMichel_&_TeresaClaramunt.png'
import './App.css'

function About() {
    return (
        <>
            <h1>Sobre</h1>
            <h1>Essas mulheres e homens gostosos</h1>
            <img
                src={hotgirls}
                alt="Hot Girls"
                style={{ maxWidth: '50%', height: 'auto' }}
            />
            <p>Rosa Luxemburgo, Angela Davis, Louise Michel, Teresa Claramunt</p>

            <img
                src={hotguys}
                alt="Hot Guys"
                style={{ maxWidth: '50%', height: 'auto' }}
            />
            <p>Mikhail Alexandrovich Bakunin, Karl Marx, Malcon X, Thomás Sankara</p>
            <p>
                <Link to="/">Voltar para Início</Link>
            </p>
        </>
    )
}

export default About
