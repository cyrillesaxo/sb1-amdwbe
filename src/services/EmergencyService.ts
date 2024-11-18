import { socket } from '../websocket/socket';

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface Location {
  lat: number;
  lng: number;
}

class EmergencyService {
  private contacts: EmergencyContact[] = [];
  private emergencyMode: boolean = false;

  async triggerSOS(currentLocation: Location): Promise<void> {
    this.emergencyMode = true;
    
    // Send SOS signal to server
    socket.emit('emergency:sos', {
      location: currentLocation,
      timestamp: new Date().toISOString(),
      contacts: this.contacts
    });

    // Send SMS to emergency contacts
    await this.notifyEmergencyContacts(currentLocation);

    // Alert nearby drivers
    this.alertNearbyDrivers(currentLocation);

    // Contact local authorities if configured
    this.notifyAuthorities(currentLocation);
  }

  async addEmergencyContact(contact: EmergencyContact): Promise<void> {
    this.contacts.push(contact);
    // Sync with server
    await this.syncContacts();
  }

  private async notifyEmergencyContacts(location: Location): Promise<void> {
    const message = `EMERGENCY ALERT: User has triggered an SOS at https://maps.google.com/?q=${location.lat},${location.lng}`;
    
    for (const contact of this.contacts) {
      try {
        await fetch('/api/emergency/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: contact.phone,
            message
          })
        });
      } catch (error) {
        console.error('Failed to notify contact:', error);
      }
    }
  }

  private alertNearbyDrivers(location: Location): void {
    socket.emit('emergency:alert-drivers', {
      location,
      radius: 5000 // 5km radius
    });
  }

  private notifyAuthorities(location: Location): void {
    fetch('/api/emergency/authorities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location })
    }).catch(console.error);
  }

  private async syncContacts(): Promise<void> {
    try {
      await fetch('/api/emergency/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: this.contacts })
      });
    } catch (error) {
      console.error('Failed to sync contacts:', error);
    }
  }
}

export const emergencyService = new EmergencyService();