import React, {useState, useRef} from 'react';

import "./Form.css"
import ListComponent from "../ListComponent/ListComponent";

function validate(form) {
    form.current.reportValidity();
    return form.current.checkValidity()
}

function submit(state) {
    console.log("FORM READY TO SUBMIT");
    console.log(state);
    alert("Ready to submit. See payload in console.");
}

function Form() {

    const form = useRef();

    const [product, setProduct] = useState("");
    const [serial, setSerial] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [hasArrived, setHasArrived] = useState(false);
    const [arrivedAt, setArrivedAt] = useState("");
    const [components, setComponents] = useState([]);
    const [description, setDescription] = useState("");

    const categories = [null, "Routers", "Switches", "Access points", "POE injectors"];

    return (
        <div className="form">
            <h1>Register products</h1>
            <form ref={form}>
                <div className="form__fields">

                    <div className="form__element">
                        <label htmlFor="">Product name</label>
                        <input name="product" type="text" required={true} value={product} onChange={(e) => {
                            setProduct(e.target.value)
                        }}/>
                    </div>
                    <div className="form__element">
                        <label htmlFor="serial">Serial nr.</label>
                        <input name="serial" type="text" required={true} value={serial} onChange={(e) => {
                            setSerial(e.target.value)
                        }}/>
                    </div>
                    <div className="form__element">
                        <label htmlFor="price">Price</label>
                        <input name="price" type="text" required={true} value={price} onChange={(e) => {
                            setPrice(e.target.value)
                        }}/>
                    </div>
                    <div className="form__element">
                        <label htmlFor="category">Category</label>
                        <select name="category" required={true} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map(cat => <option key={cat}
                                                           value={cat ? cat.toLowerCase() : null}>
                                {cat}
                            </option>)}}
                        </select>
                    </div>
                    <div className="form__element form__element--full">
                        <label htmlFor="has-arrived">Has arrived</label>
                        <input name="has-arrived" type="checkbox"
                               value={hasArrived} onChange={(e) => {
                            setHasArrived(!hasArrived)
                        }}/>
                    </div>
                    {hasArrived && <div className="form__element">
                        <label htmlFor="arrived-at">Arrived at</label>
                        <input name="arrived-at" type="date" required={hasArrived} value={arrivedAt} onChange={(e) => {
                            setArrivedAt(e.target.value)
                        }}/>
                    </div>}
                    <div className="form__element">
                        <p>Add components</p>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setComponents([...components, ""])
                        }}>+
                        </button>
                        {components.map((comp, idx) => <ListComponent value={comp} idx={idx} key={idx}
                                                                      onChange={(idx, value) => {
                                                                          setComponents([...components.slice(0, idx), value, ...components.slice(idx + 1)])
                                                                      }}
                                                                      onRemove={() => {
                                                                          setComponents([...components.slice(0, idx), ...components.slice(idx + 1)])
                                                                      }}/>)}
                    </div>
                    <div className="form__element form__element--full">
                        <label htmlFor="">Description</label>
                        <textarea name="description" defaultValue={description} onChange={(e) => {
                            setDescription(e.target.value)
                        }}/>
                    </div>
                </div>
                <button onClick={
                    (e) => {
                        e.preventDefault();
                        const state = {
                            product,
                            serial,
                            price,
                            category,
                            hasArrived,
                            arrivedAt,
                            components,
                            description
                        };
                        validate(form) && submit(state);
                    }
                }>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;