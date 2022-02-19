import { ACCESS_POINT } from "../Config";

export function ProductList(props) {
    return (
        <div class="col-lg-12" >
            {props.Products && props.Products.map((ival, i) => (

                <div class="col-sm-12  mar10 borderincr" style={{ marginRight: 0, marginLeft: 0, padding: 10, background: 'white' }}>
                    <div class='col-sm-12 row'>
                        <div class={`col-sm-1`} />
                        <div class={`col-sm-2`}>
                            <img class='borderincr shadow1' src={`${ACCESS_POINT}/${JSON.parse(ival.image)[0]}`} alt='' style={{ width: 75, height: 75, objectFit: 'contain' }} />

                        </div>
                        <div class={`col-sm-8`} style={{ maxHeight: 100, overflow: 'hidden', fontSize: 14 }}>
                            <div class="col-lg-12">
                                <label style={{ color: "#f75145", fontWeight: 'bold' }}>Name</label>
                                <br />
                                {ival.name}
                            </div>
                            <div class="col-lg-12">
                                <label style={{ color: "#f75145", fontWeight: 'bold' }}>Description</label>
                                <br />
                                {ival.info}
                            </div>

                        </div>
                    </div>

                    <hr />
                </div>
            ))}
        </div>
    )
}