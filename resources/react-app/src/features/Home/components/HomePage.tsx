import React from "react";
import {useSelector} from "react-redux";
import {selectEmail} from "../../../shared/selectors/commonSelectors";

export default () => {
    const email = useSelector(selectEmail);

    return (
        <div className="pl-3 pt-3 pr-3">
            <div className="bg-white h-100">
                <div className="pt-3">
                    <div className="d-flex pl-3 pr-3 justify-content-center">
                        <h3>Welcome {email}!</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}