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

  it('move the mouse and click button', async () => {
    await aui.moveMouseTo().button().contains().text('Switch to Dark').exec();
    await aui.mouseLeftClick().exec();
  });

  it('navigate to the calculator page', async () => {
    await aui.click().withText('Calculator').exec();
  });

  it('click left mouse key hold move and release', async () => {
    await aui.moveMouseTo().text().withExactText('AskUI').rightOf().button().contains().text().withTextRegex('\b(Drop|here)\b').exec();
    await aui.mouseToggleDown().exec();
    await aui.moveMouseTo().button().contains().text().withTextRegex('\b(Drop|here)\b').exec();
    await aui.mouseToggleUp().exec();
    await aui.expect().button().withText('Drop here').notExists().exec();
  });

  it('navigate to the register page', async () => {
    await aui.clickText({ text: 'Register', type: 'similar' });
  });

  it('fill the text fields', async () => {
    await aui.clickTextfieldNearestTo('Name:');
    await aui.type('AskUI Tester').exec();
    await aui.typeIntoTextfield({ textToWrite: 'tester@askui.com', relation: { label: 'Email:' } });
    await aui.clickTextfield('Enter your password');
    await aui.pressKeys(['a', 's', 'k', 'u', 'i', '2', '1']);
    await aui.typeIn('123456', { isSecret: true, secretMask: '**' }).textfield().rightOf().text('OTP:').exec();
  });

  it('scroll and select option from dropdown', async () => {
    await aui.clickText({ text: 'Select Date', type: 'similar' });
    await aui.scroll(0, -400).exec();
    await aui.click().text('23').exec();

    await aui.clickText({ text: 'Select Month', type: 'similar' });
    const downNumber = Math.floor(Math.random() * 12) + 1;
    await aui.pressKeyNTimes('down', downNumber);
    await aui.pressKey('enter').exec();

    await aui.clickText({ text: 'Select Year', type: 'similar' });
    await aui.scroll(0, -40).exec();
    await aui.click().text('1994').exec();
  });

  const checkboxLabels: string[] = ['Developer', 'Designer', 'Analyst'];

  function getRandomTwoIndices(arrayLength: number): number[] {
    const indices: Set<number> = new Set();
    while (indices.size < 2) {
      indices.add(Math.floor(Math.random() * arrayLength));
    }
    return Array.from(indices) as number[];
  }

  it('randomly select any two out of three checkboxes at a time', async () => {
    const [firstIndex, secondIndex] = getRandomTwoIndices(checkboxLabels.length);

    await aui.click().checkbox().leftOf().text(checkboxLabels[firstIndex]).exec();
    await aui.clickCheckbox({ label: checkboxLabels[secondIndex], relation: { type: 'leftOf' } });
  });

  it('toggle the switches', async () => {
    await aui.click().switch().rightOf().text('Subscribe to AskUI:').exec();
    await aui.clickSwitch({ label: 'AskUI Newsletter', relation: { type: 'rightOf' } });
  });

  it('click on the buttons', async () => {
    await aui.click().button().contains().text('Submit').exec();
    await aui.expect().text('Successfully submitted!').exists().exec();
    await aui.clickButton({ label: 'Reset' });
  });
  
});
