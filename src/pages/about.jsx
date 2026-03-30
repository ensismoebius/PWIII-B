import hotguys from '../assets/Bakunin_&_Marx_&_malcon_&_sankara.png'
import hotgirls from '../assets/RosaLuxemburgo_&_AngelaDavis_&_LouiseMichel_&_TeresaClaramunt.png'

export default function About() {
    return (
        <div>
            <h1>Sobre nós</h1>
            <p>Abaixo as imagens de pessoas gostosas</p>
            <img
                src={hotgirls}
                alt="This is the hottest girls in the place"
            />
            <img
                src={hotguys}
                alt="This is the hottest guys in the place"
            />
        </div>
    )
}
