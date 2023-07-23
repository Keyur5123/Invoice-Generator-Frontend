import React, { useState } from 'react';

import Sidebar from '../../Components/Sidebar/index';
import CenteredTabs from "../../Components/Tabs/CenteredTabs";
import AddProductAndParty from './AddProductAndParty';

function Index() {
    const [currTab, setCurrTab] = useState(0);
    return (
        <>
            <Sidebar>
                <CenteredTabs
                    currTab={currTab}
                    setCurrTab={setCurrTab}
                />
                {currTab == 0 ?
                    <AddProductAndParty />
                    :
                    currTab == 1 ?
                        <>
                            <p>Table view of Products</p>
                        </>
                        :
                        <>
                            <p>Table view of Party</p>
                        </>
                }
            </Sidebar>
        </>
    )
}

export default Index;