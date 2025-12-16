import { Injectable, signal } from '@angular/core';

interface RegistrationState {
    headModel: string;
    bodyModel: string;
    headTexture: number;
    bodyTexture: number;
    background: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationStateService {

    private state = signal<RegistrationState>({
        headModel: 'Hum_Head_FatBald',
        bodyModel: 'Hum_Body_Naked0',
        headTexture: 0,
        bodyTexture: 0,
        background: 'Arena Champion'
    });

    setState(newState: RegistrationState) {
        this.state.set(newState);
    }

    setHeadModel(model: string) {
        this.state.update(s => ({ ...s, headModel: model }));
    }

    setBodyModel(model: string) {
        this.state.update(s => ({ ...s, bodyModel: model }));
    }

    setHeadTextureId(textureId: number) {
        this.state.update(s => ({ ...s, headTexture: textureId }));
    }

    setBodyTextureId(textureId: number) {
        this.state.update(s => ({ ...s, bodyTexture: textureId }));
    }

    setGameStart(gameStart: string) {
        this.state.update(s => ({ ...s, gameStart }));
    }

    getState() {
        return this.state();
    }   

    
}