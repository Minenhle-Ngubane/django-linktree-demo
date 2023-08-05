import React from 'react';


const MetaDataCard = () => {
    return (
        <div>
            <h3>SEO </h3>
            <div className="card" id="SEO">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <h6><b>Custom metadata</b></h6>
                            <p>Changes to metadata may take some time to appear on other platforms.</p>

                            <div className="input-group mt-3 mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Meta title" 
                                    style={{outline: "none", border: "none", background: "#eaeaec"}}  
                                />
                            </div>
                            <div className="input-group mb-3">
                                <textarea
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Meta description"
                                    rows="3"  
                                    style={{outline: "none", border: "none", background: "#eaeaec"}}  
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MetaDataCard;