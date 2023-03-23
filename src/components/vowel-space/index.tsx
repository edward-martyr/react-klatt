import React, { useEffect, useRef, useState } from 'react';
import { Circle, SVG } from '@svgdotjs/svg.js';

import { useTheme } from '@mui/material';
import { selectF1, selectF2 } from '../../redux/formants';
import { useAppSelector } from '../../redux/hooks';
import { formantMaxes, formantMins } from '../../constants';
import './style.scss';

const VowelSpace = () => {
  const theme = useTheme();
  const f1 = useAppSelector(selectF1);
  const f2 = useAppSelector(selectF2);
  const { f1: f1Min, f2: f2Min } = formantMins;
  const { f1: f1Max, f2: f2Max } = formantMaxes;
  const [point, setPoint] = useState<Circle | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const formantsToCoordinates: {
    (formants: { f1: number }): number;
    (formants: { f2: number }): number;
    (formants: { f1: number; f2: number }): [number, number];
  } = (formants) => {
    let x, y;
    if ('f1' in formants) {
      y = (formants.f1 - formantMins.f1)
        / ((formantMaxes.f1 - formantMins.f1) / 300);
    }
    if ('f2' in formants) {
      x = (formantMaxes.f2 - formants.f2)
        / ((formantMaxes.f2 - formantMins.f2) / 300);
    }
    const xDefined = typeof x !== 'undefined';
    const yDefined = typeof y !== 'undefined';
    if (xDefined && yDefined) return [x, y];
    if (xDefined) return x;
    if (yDefined) return y;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return null as any; // should never happen when correct parameters are passed
  };

  const draw = (container: HTMLElement) => {
    const addAlpha = (hexColor: string, opacity: number) => {
      const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
      return hexColor + _opacity.toString(16).toUpperCase();
    };
    const pallette = theme.palette;
    const { dark } = pallette.primary;
    const extralight = addAlpha('#ffffff', 0.5);
    const light = addAlpha(pallette.primary.main, 0.1);
    const shadeColor = addAlpha(pallette.secondary.main, 0.1);
    const accentColor = pallette.info.dark;

    const thinStrokeStyle = {
      color: dark,
      width: 0.5,
      linecap: 'sharp',
      linejoin: 'sharp',
    };
    const thickStrokeStyle = {
      color: dark,
      width: 0.7,
      linecap: 'sharp',
      linejoin: 'sharp',
    };
    const middleAnchorStyle = {
      anchor: 'middle',
    };

    const plot = SVG().addTo(container).viewbox(0, 0, 300, 300);
    plot.attr('id', 'vowel-space');

    // background
    plot
      .polygon([
        formantsToCoordinates({ f1: f1Min, f2: f2Min }),
        formantsToCoordinates({ f1: f1Min, f2: f2Max }),
        formantsToCoordinates({ f1: f1Max, f2: f2Max }),
        formantsToCoordinates({ f1: f1Max, f2: f2Min }),
      ])
      .fill(light);

    // vowel space
    const highFrontCoord = formantsToCoordinates({ f1: 270, f2: 2500 });
    const highBackCoord = formantsToCoordinates({ f1: 300, f2: 600 });
    const lowBackCoord = formantsToCoordinates({ f1: 800, f2: 1000 });
    const lowFrontCoord = formantsToCoordinates({ f1: 1000, f2: 2000 });
    plot
      .polygon([highFrontCoord, highBackCoord, lowBackCoord, lowFrontCoord])
      .fill(extralight)
      .stroke(thickStrokeStyle);

    // shade
    plot
      .polygon([
        formantsToCoordinates({ f1: f2Min, f2: f2Min }),
        formantsToCoordinates({ f1: f1Max, f2: f1Max }),
        formantsToCoordinates({ f1: f1Max, f2: f2Min }),
      ])
      .fill(shadeColor)
      .stroke('transparent');

    // frame
    plot
      .polygon([
        formantsToCoordinates({ f1: f1Min, f2: f2Min }),
        formantsToCoordinates({ f1: f1Min, f2: f2Max }),
        formantsToCoordinates({ f1: f1Max, f2: f2Max }),
        formantsToCoordinates({ f1: f1Max, f2: f2Min }),
      ])
      .fill('none')
      .stroke(thinStrokeStyle);

    plot
      .text('i·y')
      .move(highFrontCoord[0] - 10, highFrontCoord[1] - 20)
      .font(middleAnchorStyle);
    plot
      .text('ɯ·u')
      .move(highBackCoord[0] - 10, highBackCoord[1] - 25)
      .font(middleAnchorStyle);
    plot
      .text('ɑ·ɒ')
      .move(lowBackCoord[0], lowBackCoord[1])
      .font(middleAnchorStyle);
    plot
      .text('a·ɶ')
      .move(lowFrontCoord[0], lowFrontCoord[1] - 5)
      .font(middleAnchorStyle);

    // point
    setPoint(
      plot
        .circle(5)
        .fill(accentColor)
        .center(...formantsToCoordinates({ f1, f2 })),
    );

    // label texts
    const xLabel = plot.text('F2 (Hz)');
    xLabel
      .move(
        (formantsToCoordinates({ f2: f2Min })
          + formantsToCoordinates({ f2: f2Max }))
          / 2,
        formantsToCoordinates({ f1: f1Max }),
      )
      .font(middleAnchorStyle);
    const yLabel = plot.text('F1 (Hz)');
    yLabel
      .move(
        formantsToCoordinates({ f2: f2Max }) - yLabel.bbox().height / 2,
        (formantsToCoordinates({ f1: f1Min }) + formantsToCoordinates({ f1: f1Max }) - yLabel.bbox().height) / 2,
      )
      .font(middleAnchorStyle)
      .rotate(-90);
    const xMaxLabel = plot.text(f2Max.toString());
    xMaxLabel
      .move(
        formantsToCoordinates({ f2: f2Max }) + xMaxLabel.bbox().width / 2,
        formantsToCoordinates({ f1: f1Max }),
      )
      .font(middleAnchorStyle);
    const xMinLabel = plot.text(f2Min.toString());
    xMinLabel
      .move(
        formantsToCoordinates({ f2: f2Min }) - xMinLabel.bbox().width / 2,
        formantsToCoordinates({ f1: f1Max }),
      )
      .font(middleAnchorStyle);
    const yMaxLabel = plot.text(f1Max.toString());
    yMaxLabel
      .move(
        formantsToCoordinates({ f2: f2Max }) - yMaxLabel.bbox().height / 2,
        formantsToCoordinates({ f1: f1Max }) - yMaxLabel.bbox().height * 1.5,
      )
      .font(middleAnchorStyle)
      .rotate(-90);
    const yMinLabel = plot.text(f1Min.toString());
    yMinLabel
      .move(
        formantsToCoordinates({ f2: f2Max }) - yMinLabel.bbox().height / 2,
        formantsToCoordinates({ f1: f1Min }) + yMinLabel.bbox().height / 2,
      )
      .font(middleAnchorStyle)
      .rotate(-90);
    const title = plot.text('Vowel Space');
    title
      .move(
        (formantsToCoordinates({ f2: f2Min }) + formantsToCoordinates({ f2: f2Max })) / 2,
        formantsToCoordinates({ f1: f1Max }) - title.bbox().height,
      )
      .font(middleAnchorStyle);
  };

  useEffect(() => {
    const container = containerRef.current as HTMLElement;
    if (!container.firstChild) {
      draw(container);
    }
    point?.center(...formantsToCoordinates({ f1, f2 }));
  }, [f1, f2]);

  return <div id="vowel-space-container" ref={containerRef} />;
};

export default VowelSpace;
