import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { withRouter} from "react-router-dom";
import { connect } from "react-redux";

function Cal(){
    let calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin ],
        initialView: 'dayGridMonth'
      });
    
    return(
        calendar.render()

    );

}
export default connect( )(withRouter(Cal));