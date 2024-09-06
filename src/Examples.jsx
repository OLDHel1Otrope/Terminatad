import MoreLinks from "./MoreLinks";

function Examples() {
    return (
        <>
            <div className="example-card">
                <div className="examples-holder">
                    <div className="item1"><div className="itemcontent"> </div></div>
                    <div className="item3"><div className="itemcontent"> </div></div>
                    <div className="item4"><div className="itemcontent"> </div></div>
                    <div className="item5"><div className="itemcontent"> </div></div>
                    <div className="item6"><div className="itemcontent"> </div></div>
                    {/* <div className="item"><div className="itemcontent"> </div></div> */}
                    <div className="item2"><div className="itemcontent"> </div></div>
                    <div className="item7"><div className="itemcontent2"><div className="more-links"><MoreLinks name="Know more"></MoreLinks></div></div></div>
                </div>
            </div>
        </>);
}
export default Examples;