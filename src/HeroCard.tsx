import * as Dew from 'rxjs-dew-react';
import * as React from 'react';
import { State, Service } from './Service';
import { Hero, HeroClass } from './hero';
import { Card, Form, SemanticCOLORS, Label } from 'semantic-ui-react';
import { style, types } from 'typestyle';

export namespace HeroCard {
    export type Props = {
        hero: Hero;
    };
}

export class HeroCard extends Dew.Consumer<HeroCard.Props, {}> {
    state = State.initial;
    protected store = this.storeMap.heros as Service;

    componentWillMount() {
        this.subscribe(this.store.state$);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const hero = this.props.hero;
        var color: SemanticCOLORS;
        switch (hero.heroClass) {
            case HeroClass.Cosmic:
                color = 'teal';
                break;
            case HeroClass.Mutant:
                color = 'yellow';
                break;
            case HeroClass.Mystic:
                color = 'purple';
                break;
            case HeroClass.Science:
                color = 'green';
                break;
            case HeroClass.Skill:
                color = 'red';
                break;
            case HeroClass.Tech:
                color = 'blue';
                break;
            default:
                color = 'black';
                break;
        }
        return (
            <Card raised={true} color={color} className={style(cardStyle)}>
                <Card.Header>
                    <h3>{hero.name}</h3>
                    <Label color={color} attached="top right">{hero.heroClass}</Label>
                </Card.Header>
                <Card.Content>
                    <Form>
                    <Form.Checkbox
                        label="Owned"
                        checked={this.state.own.some(e => e === hero.heroId)}
                        onChange={(e, v) => v.checked !== undefined && this.store.own(hero.heroId, v.checked)}
                    />
                    <Form.Checkbox
                        label="Awake"
                        checked={this.state.awake.some(e => e === hero.heroId)}
                        onChange={(e, v) => v.checked !== undefined && this.store.awake(hero.heroId, v.checked)}
                    />
                    <Form.Checkbox
                        label="High Signature"
                        checked={this.state.highSig.some(e => e === hero.heroId)}
                        onChange={(e, v) => v.checked !== undefined && this.store.high(hero.heroId, v.checked)}
                    />
                    </Form>
                </Card.Content>
            </Card>
        );
    }
}

const cardStyle: types.NestedCSSProperties = {
    padding: 5,
    $nest: {
        'h3': { margin: 5 },
    }
};