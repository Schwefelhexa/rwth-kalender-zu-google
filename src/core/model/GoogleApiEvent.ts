export interface GoogleApiDateTime {
  dateTime: string;
}

interface GoogleApiEvent {
  description: string;
  summary: string;

  start: GoogleApiDateTime;
  end: GoogleApiDateTime;

  colorId: string;

  location: string;
}
export default GoogleApiEvent;
