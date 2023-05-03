import { Component, OnInit } from '@angular/core';

declare var dymo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  printers: any[] = [];
  selectedPrinter: string = '';

  ngOnInit() {
    // const script = document.createElement('script');
    // script.src = 'assets/dymo-sdk/dymo.connect.framework.js';
    // document.body.appendChild(script);
    this.printers = dymo.label.framework.getPrinters();

    // dymo.label.framework.init().then(() => {
    //   this.printers = dymo.label.framework.getPrinters();
    // });

  }

  labelXml: string = `<?xml version="1.0" encoding="utf-8"?>
    <DieCutLabel Version="8.0" Units="twips">
      <PaperOrientation>Landscape</PaperOrientation>
      <Id>Address</Id>
      <PaperName>30252 Address</PaperName>
      <DrawCommands>
        <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />
      </DrawCommands>
      <ObjectInfo>
        <AddressObject>
          <Name>Address</Name>
          <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
          <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
          <LinkedObjectName></LinkedObjectName>
          <HorizontalAlignment>Left</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <TextFitMode>None</TextFitMode>
          <UseFullFontHeight>True</UseFullFontHeight>
          <Verticalized>False</Verticalized>
          <StyledText>
            <Element>
              <String>John Smith</String>
              <Attributes>
                <Font Family="Arial" Size="14" Bold="True" />
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
              </Attributes>
            </Element>
            <Element>
              <String>123 Main St.</String>
              <Attributes>
                <Font Family="Arial" Size="12" Bold="False" />
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
              </Attributes>
            </Element>
            <Element>
              <String>Anytown, USA 12345</String>
              <Attributes>
                <Font Family="Arial" Size="12" Bold="False" />
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
              </Attributes>
            </Element>
          </StyledText>
          <ShowBarcodeFor9DigitZipOnly>False</ShowBarcodeFor9DigitZipOnly>
          <BarcodePosition>AboveAddress</BarcodePosition>
          <LineFonts>
            <Font Family="Arial" Size="12" Bold="False" />
            <Font Family="Arial" Size="12" Bold="True" />
            <Font Family="Arial" Size="12" Bold="False" />
          </LineFonts>
        </AddressObject>
        <Bounds X="332" Y="267" Width="4455" Height="1260" />
      </ObjectInfo>
    </DieCutLabel>`;


    async printLabel(): Promise<void> {
      await dymo.label.framework.init();
      const selectedPrinter = this.printers.find((printer) => printer.name === this.selectedPrinter);
      if (!selectedPrinter) {
        console.log('Selected printer not found.');
        return;
      }

      const label = dymo.label.framework.openLabelXml('<Label><TextObject><Text>Test Label</Text></TextObject></Label>');
      label.print(selectedPrinter.name);
    }
}

