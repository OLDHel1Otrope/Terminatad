import Header from './Header'
import Footer from './Footer'
import Card from './Card'
import DynamicCard from './DynamicCard'
import Examples from './Examples';

function Home() {

    return (
        <>
            <Header />
            <div className='focuss'>
                <Card title="Eliminatad" definition="Enhance photos by removing Ads"></Card>
                <Examples />
                <DynamicCard />
            </div>
            <Footer />
        </>
    );

}

export default Home
