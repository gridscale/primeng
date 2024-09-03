import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Code } from '@domain/code';
import { Subscription, debounceTime } from 'rxjs';
import { AppConfigService } from '@service/appconfigservice';
@Component({
    selector: 'chart-doughnut-demo',
    template: `
        <app-docsectiontext>
            <p>
                A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a
                whole to be included.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-chart type="doughnut" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
        </div>
        <app-code [code]="code" selector="chart-doughnut-demo"></app-code>
    `,
})
export class DoughnutDoc implements OnInit {
    data: any;

    options: any;

    subscription!: Subscription;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');

            this.data = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--p-cyan-500'),
                            documentStyle.getPropertyValue('--p-orange-500'),
                            documentStyle.getPropertyValue('--p-gray-500'),
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--p-cyan-400'),
                            documentStyle.getPropertyValue('--p-orange-400'),
                            documentStyle.getPropertyValue('--p-gray-400'),
                        ],
                    },
                ],
            };

            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
            };
        }
    }
    code: Code = {
        basic: `<p-chart type="doughnut" [data]="data" [options]="options" class="w-full md:w-[30rem]" />`,
        html: `<div class="card flex justify-center">
    <p-chart type="doughnut" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'chart-doughnut-demo',
    templateUrl: './chart-doughnut-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartDoughnutDemo implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');

        this.data = {
            labels: ['A', 'B', 'C'],
             datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                }
            ]
        };


        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }
}`,
    };
}
