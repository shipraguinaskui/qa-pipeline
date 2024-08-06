import { aui } from './helpers/askui-helper';
import * as os from 'os';

describe('jest with askui', () => {

  function detectOperatingSystem(): string {
    const platform = os.platform();
    switch (platform) {
      case 'win32':
        return 'Windows';
      case 'darwin':
        return 'macOS';
      case 'linux':
        return 'Linux';
      default:
        return 'Unknown OS';
    }
  }
  const operatingSystem = detectOperatingSystem();
  console.log(`The operating system is: ${operatingSystem}`);

  it('open google chrome', async () => {
    await aui.execOnShell("open -a 'Google Chrome'").exec();
    await aui.pressTwoKeys('command', 't').exec();
  });

  it('navigate to practise page', async () => {
    await aui.type('https://askui.github.io/askui-practice-page/').exec();
    await aui.pressKey('enter').exec();
  });
});