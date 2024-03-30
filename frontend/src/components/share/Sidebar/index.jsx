import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'; 

export default function Sidebar() {
  return (
    <SimpleBar style={{ maxHeight: 300 }}>
      {/* Your content that needs scrolling goes here */}
    </SimpleBar>
  );
}


