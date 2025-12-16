import { Component, signal, computed } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RegistrationStateService } from './registration-state-service';

declare const squirrel: any;

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './character-creator.html',
  styleUrls: ['./character-creator.css']
})
export class CharacterCreator {
  // simple arrays of names; these represent available models/textures
  readonly headModels = ["Hum_Head_FatBald", "Hum_Head_Fighter", "Hum_Head_Pony", "Hum_Head_Bald", "Hum_Head_Thief", "Hum_Head_Psionic", "Hum_Head_Babe"];
  readonly bodyModels = ["Hum_Body_Naked0", "Hum_Body_Babe0"];
  readonly bodyTextureMaxValue = 10;
  readonly headTextureMaxValue = 163;
  readonly gameStartName = ["Arena Champion", "Arcane Mage", "Infamous Hunter"];
  readonly gameStartDescription = ["Growing up in a difficult environment, you accomplished the seemingly impossible. You worked your way up as a gladiator, winning the most prestigious tournaments and earning fame and fortune along the way. After becoming the champion of the arena in Mora Sul, you were awarded a legendary weapon — the 'Arcane Guard Sword'! But your story doesn't end here. Equipped with the experience and skills of a seasoned warrior, you set out on a new adventure to explore uncharted territories, seeking greater challenges and forging your legacy as a legendary hero."
    , "Since childhood, you have shown an extraordinary affinity for the arcane arts. Your natural talent for magic set you apart from your peers, and you have dedicated your life to mastering the mystical forces that govern our world. As an Arcane Mage, you wield spells of immense power — rivaling the forces of nature itself. Now, armed with your knowledge and magical prowess, you embark on a journey to uncover ancient secrets and protect the realm from the dark forces that threaten its very existence."
    , "From an early age, you displayed an uncanny ability to track and hunt even the most elusive creatures. Growing up in the wilds, you honed your skills as a hunter, learning to survive off the land and becoming one with nature. Your reputation as a renowned hunter has spread far and wide, built upon your unparalleled marksmanship and deep understanding of the wilderness. Now, you set out on a new journey — seeking legendary beasts and uncovering ancient mysteries hidden in the farthest reaches of the realm."
  ];

  readonly menuDescription = "Select your character's appearance and background to begin your adventure.";

  // indexes for current selection as signals
  headModelIdx = signal(0);
  bodyModelIdx = signal(0);
  headTextureIdx = signal(0);
  bodyTextureIdx = signal(0);
  gameStartIdx = signal(0);

  constructor(private registrationStateService: RegistrationStateService) {}
  // helpers
  private wrap(idx: number, len: number) {
    if (len <= 0) return 0;
    return ((idx % len) + len) % len;
  }


  sendToSquirrel() {
    const jsonData = { headModel: this.headModels[this.headModelIdx()], bodyModel: this.bodyModels[this.bodyModelIdx()], headTexture: this.headTextureIdx(), bodyTexture: this.bodyTextureIdx(), messageContext: "setVisual" };
    squirrel.call("sendToServerHandler", JSON.stringify(jsonData));
  }

  updateRegistrationState() {
    const registrationState = { headModel: this.headModels[this.headModelIdx()], bodyModel: this.bodyModels[this.bodyModelIdx()], headTexture: this.headTextureIdx(), bodyTexture: this.bodyTextureIdx(), background: this.gameStartName[this.gameStartIdx()] };
    this.registrationStateService.setState(registrationState);
  }

  updateStates() {
    this.updateRegistrationState();
    this.sendToSquirrel();
  }

  prevFaceModel() {
    const next = this.wrap(this.headModelIdx() - 1, this.headModels.length);
    this.headModelIdx.set(next);
    this.updateStates()
  }
  nextFaceModel() {
    const next = this.wrap(this.headModelIdx() + 1, this.headModels.length);
    this.headModelIdx.set(next);
    this.updateStates()
  }

  prevFaceTexture() {
    const next = this.wrap(this.headTextureIdx() - 1, this.headTextureMaxValue);
    this.headTextureIdx.set(next);
    this.updateStates()
  }
  nextFaceTexture() {
    const next = this.wrap(this.headTextureIdx() + 1, this.headTextureMaxValue);
    this.headTextureIdx.set(next);
    this.updateStates()
  }

  prevBodyModel() {
    const next = this.wrap(this.bodyModelIdx() - 1, this.bodyModels.length);
    this.bodyModelIdx.set(next);
    this.updateStates()
  }
  nextBodyModel() {
    const next = this.wrap(this.bodyModelIdx() + 1, this.bodyModels.length);
    this.bodyModelIdx.set(next);
    this.updateStates()
  }

  prevBodyTexture() {
    const next = this.wrap(this.bodyTextureIdx() - 1, this.bodyTextureMaxValue);
    this.bodyTextureIdx.set(next);
    this.updateStates()
  }
  nextBodyTexture() {
    const next = this.wrap(this.bodyTextureIdx() + 1, this.bodyTextureMaxValue);
    this.bodyTextureIdx.set(next);
    this.updateStates()
  }

  prevGameStart() {
    const next = this.wrap(this.gameStartIdx() - 1, this.gameStartDescription.length);
    this.gameStartIdx.set(next);
    this.updateStates()
  }
  nextGameStart() {
    const next = this.wrap(this.gameStartIdx() + 1, this.gameStartDescription.length);
    this.gameStartIdx.set(next);
    this.updateStates()
  }

  selection = computed(() => ({
    faceModel: this.headModels[this.headModelIdx()],
    faceTexture: this.headTextureIdx(),
    bodyModel: this.bodyModels[this.bodyModelIdx()],
    bodyTexture: this.bodyTextureIdx(),
    gameStartName: this.gameStartName[this.gameStartIdx()],
    gameStartDescription: this.gameStartDescription[this.gameStartIdx()]
  }));
}
