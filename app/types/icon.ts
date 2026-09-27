// BaseIcon.vue'daki ICONS haritasının anahtarlarıyla birebir — tek kaynak burada
// tutulmuyor çünkü ICONS haritası path verisiyle birlikte BaseIcon.vue içinde
// kalmalı; bu union sadece dışarıdan tip güvenli referans için.
export type IconName
  = | 'chevron-down'
    | 'plus'
    | 'minus'
    | 'check'
    | 'phone'
    | 'mail'
    | 'arrow-right'
    | 'shield'
    | 'menu'
    | 'close'
    | 'pin'
