// in src/MyToolbar.jss
import { Toolbar, SaveButton } from 'react-admin';

export const MyToolbar = () => (
    <Toolbar style={{position: "fixed", width:'100%', zIndex:'10', bottom:"0"}}>
        <SaveButton label="Save the changes" />
    </Toolbar>
);
