import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomControls } from '../../app.config';

@Component({
    selector: 'app-memo',
    standalone: true,
    imports: [...CustomControls],
    templateUrl: './memo.component.html',
    styleUrl: './memo.component.css'
})
export class MemoComponent {

    data: any;

    @Input('inputdata') set inputdata(v: any) {
        this.data = v;
    }

    constructor(private router: Router) { }

    openMemo(): void {
        this.router.navigate(['/common-shipment/memoEdit'], {
            queryParams: {
                id: 0, // always 0 as per original button
                parent_id: this.data?.parent_id || 0,
                parent_type: this.data?.parent_type || '',
                rec_memo_count: this.data?.rec_memo_count || 0,
                rec_memo_attached: this.data?.rec_memo_attached || '',
                mode: 'add',
                menuid: 'MEMO',
                type: 'MEMO',
                appid: this.data?.appid || ''
            }
        });
    }

}
