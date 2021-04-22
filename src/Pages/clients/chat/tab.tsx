import React, { useEffect, useState } from 'react';
import { Tab, AppBar, Tabs, Box, Badge } from '@material-ui/core';
import Tech_Support from './tech_support'
import Sales_Support from './sales_support'
import './chat.css'
import { list } from 'rxfire/database';
import { debounceTime, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import firebase from '../../../firebase/firebase';
import { UserRole } from '../../../features/auth/types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DashTab = ({ uid_1 }: any) => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [messageCountSales, setMessageCountSales] = useState(0);
    const [messageCountTech, setMessageCountTech] = useState(0);

    useEffect(() => {
        const ref = firebase.database().ref("conversations");
        const user_messages = list(ref)
            .pipe(
                map((changes: any) => changes.map((c: any) => {
                    return { key: c.snapshot.key, event: c.event, ...c.snapshot.val() }
                }),
                ))
            .subscribe((data: any[]) => {
                const filtered = data.filter((item) => {
                    return (item.user_uid_2 === uid_1) &&
                        (item.from === UserRole.SALES_PERSON) &&
                        (item.isView === false)
                })
                const filteredTech = data.filter((item) => {
                    return (item.user_uid_2 === uid_1) &&
                        (item.from === UserRole.TECH_SUPPORT)&&
                        (item.isView === false)
                })
                setMessageCountSales(filtered.length);
                setMessageCountTech(filteredTech.length);
            })
        return () => {
            user_messages.unsubscribe();
        }
    }, [])

    return (
        <div className="chat-box">
            <AppBar position="static" color="primary">
                <Tabs value={value} onChange={handleChange} style={{ backgroundColor: 'red', margin: 0 }} centered>
                    <Tab label={<Badge badgeContent={messageCountTech} color="primary">Tech</Badge>} {...a11yProps(0)} />
                    <Tab label={<Badge badgeContent={messageCountSales} color="primary">Sales</Badge>} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Tech_Support uid_1={uid_1} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Sales_Support uid_1={uid_1} />
            </TabPanel>
        </div>

    )

}

export default DashTab;