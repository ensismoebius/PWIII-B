import { Link } from 'react-router-dom'
import hotguys from '../assets/Bakunin_&_Marx_&_malcon_&_sankara.png'
import hotgirls from '../assets/RosaLuxemburgo_&_AngelaDavis_&_LouiseMichel_&_TeresaClaramunt.png'

function About() {
    return (
        <div className="exuberant-div">
            <h1 className="exuberant-title">Sobre</h1>
            <h2 className="exuberant-subtitle">Essas mulheres e homens gostosos</h2>
            <div className="exuberant-image-container">
                <img
                    src={hotgirls}
                    alt="Hot Girls"
                    className="exuberant-image"
                />
            </div>
            <p className="exuberant-caption">Rosa Luxemburgo, Angela Davis, Louise Michel, Teresa Claramunt</p>

            <div className="exuberant-image-container">
                <img
                    src={hotguys}
                    alt="Hot Guys"
                    className="exuberant-image"
                />
            </div>
            <p className="exuberant-caption">Mikhail Alexandrovich Bakunin, Karl Marx, Malcon X, Thomás Sankara</p>
            <p>
                <Link to="/" className="exuberant-link">Voltar para Início</Link>
            </p>
        </div>
    )
}

export default About